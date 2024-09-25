import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import Header from './Header';
export default function AfterLogin(userDetails) {
    const user = userDetails.user;

    const logout = () => {
        window.open(
          `${import.meta.env.VITE_API_URL}/auth/logout`,
          "_self"
        );
      };
      // console.log(user.email) , user.name, 
  return (
    <div className ="auth-main">
      <div className = "auth-header">
        <Header/>
        <div className="button-div" id = "logout-button">
          <button className='lgo-bt' onClick={logout}>Logout</button>
        </div>
      </div>
      <div className ="auth-body">
        <div className = "questions">
          <QuestionCard className = "qc" title = "Question 1" content = "Testcontentthi this is a sentence"/>
          <QuestionCard className = "qc" title = "Question 2" content = "Testcontentthi this is a sentence"/>
          <QuestionCard className = "qc" title = "Question 3" content = "Testcontentthi this is a sentence"/>
        </div>
        <div className = "auth-header">
        <div className="button-div" id = "save-button">
              <button className = 'sv-bt'>Save Changes</button>
        </div>
      </div>
      </div>

    </div>
  );
}
