import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("We'll send you a login link!");
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setMessage("Invalid email, please re-enter");
      return;
    }

    setLoading(true);
    const url = `${backendURL}/auth/getMagicLink/${email}`;

    fetch(url, {
      method: "GET",
    })
      .then(() => {
        setMessage("Please check your email!");
      })
      .catch(() => {
        setMessage("Something went wrong! Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className='md:mr-[10%] bg-zinc-800 h-full flex flex-col p-6 rounded-lg border border-zinc-700 items-center shadow-xl gap-10 md:w-3/10 md:max-h-80 w-3/4 md:max-w-[90%]'>
      <h1 className='text-3xl font-semibold'>
        Sign In<br />
      </h1>
      <input
        value={email}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder='Enter your email'
        className='focus:outline-none rounded-sm border-zinc-700 border-2 w-11/12 h-10 px-3'
      />
      <button
        onClick={handleLogin}
        className='hover:cursor-pointer transition-transform duration-300 ease-in-out hover:translate-y-1 bg-stone-100 text-zinc-700 w-25 h-10 rounded-lg font-bold flex items-center justify-center'
        disabled={loading}
      >
        {loading ? <span className="inline-block align-middle w-4 h-4 border-[3px] border-gray-200 border-t-zinc-700 rounded-full animate-spin"></span> : 'Login'}
      </button>
      <h4 className='text-sm text-zinc-400'><i>{message}</i></h4>
    </div>
  );
}
