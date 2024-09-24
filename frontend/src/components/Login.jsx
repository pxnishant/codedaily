import React from 'react'
import './login.css'

export default function Login() {
  return (
    <div className = "login-box">
        <h1>Login</h1>
        <form>

            <input type = "text" placeholder = 'Email' id = "login-input"></input>
            <input type = "password" placeholder='Password' id = "login-input"></input>
            <button type="submit" id="login-button">Login</button>

        </form>


    </div>


  )
}
