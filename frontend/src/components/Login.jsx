import React from 'react'

export default function Login() {
  return (
    <div className='md:mr-[10%] bg-zinc-800 h-full flex flex-col p-6 rounded-lg border-1 border-zinc-700 items-center shadow-xl gap-10 md:w-40/100 md:max-h-80 w-70/100 md:max-w-90'>
        <h1 className='text-3xl font-semibold'>
            Sign In<br/>
        </h1>
        <input placeholder='Enter your email' className='focus:outline-none rounded-sm border-zinc-700 border-2 w-19/20 h-10 px-3'></input>
        <button className='hover: cursor-pointer transition-transform duration-300 ease-in-out hover:translate-y-1 bg-blue-600 text-white rounded    bg-stone-100 text-zinc-700 w-25 h-10 rounded-lg font-bold'>Login</button>
        <h4 className='text-sm text-zinc-400'><i>We'll send you a login link!</i></h4>
        </div>
  )
}
