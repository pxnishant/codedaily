import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePreLogin from './components/HomePreLogin';
import HomePostLogin from './components/HomePostLogin';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const protocol = import.meta.env.VITE_PROTOCOL;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("token: ", token)

    if (token) {
      localStorage.setItem("token", token);
      console.log("setting in local storage")
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("fetching from local storage", token)
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${backendURL}/auth/checklogin`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.isAuthenticated) {
        setIsLoggedIn(true);
        setEmail(data.email);
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    })
    .catch(error => {
      console.error("Authentication error:", error);
      localStorage.removeItem("token");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <HomePostLogin/> : <HomePreLogin/>}/>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  );
}
