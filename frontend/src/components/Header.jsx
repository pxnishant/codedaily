import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between px-8 bg-zinc-800 shadow-sm shadow-zinc-800 h-16 w-full' >
      <div className='font-bold text-2xl font-spartan py-4'>
        <h1>codedaily.</h1>
      </div>
      <div className=''>
        <img src='src/images/help-icon.png' className='h-13 my-1'></img>
      </div>
    </div>
  )
}
