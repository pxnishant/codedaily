import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AfterLogin from './components/AfterLogin.jsx';
import BeforeLogin from './components/BeforeLogin.jsx';
import './index.css'

function App() {

	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${import.meta.env.VITE_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

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
