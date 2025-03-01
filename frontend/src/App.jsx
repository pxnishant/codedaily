import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AfterLogin from './components/AfterLogin.jsx';
import BeforeLogin from './components/BeforeLogin.jsx';
import './index.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/checkLogin/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isAuthenticated)
        // setEmail(data)
        console.log("dataaaa---------------------: ", data)
    })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <AfterLogin email={email} /> : <BeforeLogin />} />
    </Routes>
  );
}

export default App;
