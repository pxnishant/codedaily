import React from 'react';

export default function Login({title}) {

  return (
    <div className="login-div">
		<input className = "login" placeholder="Email"></input>
        <button className='lg-bt'>{title}</button>
    </div>
  );
}
