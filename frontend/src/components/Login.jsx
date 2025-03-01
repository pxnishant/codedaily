import React, { useState, useEffect } from "react";

export default function Login({ title }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginClick = async (email) => {
    if (!validateEmail(email)) {
      setMessage("Invalid email, please re-enter");
      return;
    }

    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/auth/getMagicLink/${email}`, {
      method: "GET",
    })
      .then(() => {
        setMessage("Please check your email!");
      })
      .catch(() => {
        setMessage("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      loginClick(email);
    }
  };

  return (
    <div className="login-div">
      <input
        className="login"
        placeholder="Email"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button className="lg-bt" onClick={() => loginClick(email)} disabled={loading}>
        {loading ? <div className="loader"></div> : title}
      </button>

      {message && (
        <div className="retro-popup" id="popup3">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
