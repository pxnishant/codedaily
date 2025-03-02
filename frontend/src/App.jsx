import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import AfterLogin from "./components/AfterLogin.jsx";
import BeforeLogin from "./components/BeforeLogin.jsx";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/checklogin`, {
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
      })
      .catch(error => {
        console.error("Authentication error:", error);
        localStorage.removeItem("token");
      });
    }
  }, []);

  return (
    <Routes>
      <Route 
        path="/" 
        element={isLoggedIn ? <AfterLogin /> : <BeforeLogin />} 
      />
    </Routes>
  );
}

export default App;