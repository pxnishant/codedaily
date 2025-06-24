import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header( {isLoggedIn} ) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload();
  }



  return (
    <div className='flex justify-between px-8 bg-zinc-800 shadow-sm shadow-zinc-800 h-16 w-full' >
      <div className='font-bold text-2xl font-spartan py-4'>
        <h1>codedaily.</h1>
      </div>
      <div className='flex gap-5 items-center'>

        {/* <button className='rounded-sm hover: cursor-pointer transition-transform duration-300 ease-in-out hover:translate-y-1 rounde font-bold'>
          <img src='src/images/help-icon.png' className='h-11 my-1'></img>
        </button> */}
        
        {isLoggedIn && <button onClick = { handleLogout } className='bg-blue-400 w-20 h-8 rounded-sm hover:cursor-pointer transition-transform duration-300 ease-in-out hover:translate-x-1 font-bold'>Logout</button> }
      </div>
    </div>
  )
}
