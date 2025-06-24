import React from 'react'
import Header from './Header'
import Intro from './Intro'
import Login from './Login'
export default function PreLogin() {
  return (
    <div className='flex flex-col h-full items-center'>
      <Header isLoggedIn = { false }></Header>
      <div className='flex md:gap-[20%] flex-col md:flex-row md:justify-center h-full w-full gap-5 items-center max-h-140 py-10 md:py-0'>
        <Intro></Intro>
        <Login></Login>
      </div>
    </div>
  )
}
