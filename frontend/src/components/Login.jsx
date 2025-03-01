import React from 'react';
import { useState } from 'react';

export default function Login({title}) {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    setEmail(event.target.value) 
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginClick = async (email) => {

    if (!validateEmail(email)) {
      alert("Invalid email, please re-enter!")
      return
    }

    fetch(`${import.meta.env.VITE_API_URL}/auth/getMagicLink/${email}`, {
      method: "GET"
    }).then((res) => {

      setMessage("Please check your email for login link!")

    }).catch((err) => {
      setMessage("Something went wrong")
    })

  }

  return (
    <div className="login-div">
		  <input className = "login" placeholder="Email" onChange = {handleChange}></input>
      <button className='lg-bt' onClick = {() => loginClick(email)}>{title}</button>
      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
