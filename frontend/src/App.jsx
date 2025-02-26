import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AfterLogin from './components/AfterLogin.jsx';
import BeforeLogin from './components/BeforeLogin.jsx';
import './index.css'

function App() {

    const [user, setUser] = useState(null);
    useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/auth/login/success`, {
        withCredentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }
      })
      .then(response => {
         setUser(response.data.user)
      })
    },[user])

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <AfterLogin user={user} /> : <BeforeLogin />}
      />
    </Routes>
  );
}

export default App;
