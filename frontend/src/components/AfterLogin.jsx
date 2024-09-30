import React, { useState, useEffect, useRef } from 'react';
import QuestionCard from './QuestionCard';
import Header from './Header';
import './Popup.css'


export default function AfterLogin(userDetails) {

  const user = userDetails.user;

  console.log('printing user after login', user);

  //defining states

  const [difficulty, setDifficulty] = useState(new Array(9).fill(false))
  const [topics, setTopics] = useState(new Array(24).fill(false))

  //logoout button

  const logout = () => {
      window.open(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        "_self"
      );
    };

    //save button popup

    const [showPopup, setShowPopup] = useState(false);

    function popUpButton () {

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

    };

    const [showPopup2, setShowPopup2] = useState(false);

    function popUpButton2 () {

      setShowPopup2(true);

      setTimeout(() => {
        setShowPopup2(false);
      }, 3000);

    };

    //data validation on clicking save

    function validate () {


      for (let i=0; i<=7; i++) {

        if (topics[i] && !(difficulty[0] || difficulty[1] || difficulty[2])) {

          return false;

        }

      }

      for (let i=8; i<=15; i++) {

        if (topics[i] && !(difficulty[3] || difficulty[4] || difficulty[5])) {

          return false;

        }

      }

      for (let i=16; i<=23; i++) {

        if (topics[i] && !(difficulty[6] || difficulty[7] || difficulty[8])) {

          return false;

        }

      }


      if (difficulty[0] || difficulty[1] || difficulty[2]) {
        let check = true;
        for (let i=0; i<=7; i++) {
          if (topics[i]) {
            check = false;
          }}
        
        if (check) {return false;}
      }


      if (difficulty[3] || difficulty[4] || difficulty[5]) {
        let check = true;
        for (let i=8; i<=15; i++) {
          if (topics[i]) {
            check = false;
          }}
        
        if (check) {return false;}
      }

      if (difficulty[6] || difficulty[7] || difficulty[8]) {
        let check = true;
        for (let i=16; i<=23; i++) {
          if (topics[i]) {
            check = false;
          }}
        
        if (check) {return false;}
      }


      return true;

    };

    //on change functions

    const handleOnChangeT = (position) => {
      const updatedArr = topics.map((item, index) =>
        index === position ? !item:item
      );

      setTopics(updatedArr);

    }

    const handleOnChangeD = (position) => {
      const updatedArr = difficulty.map((item, index) =>
        index === position ? !item:item
    );

      setDifficulty(updatedArr);
    }

    async function saveData(email, difficulty, topics) {

      fetch(`${import.meta.env.VITE_API_URL}/updateuser`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,  
          difficulty: difficulty,
          topics: topics
        })
      }).then(() => console.log('request to update successfuly sent'))
      
    }

    async function getData(email) {

      try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/getdata`, {

          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': email
          }
        })

        const data = await response.json();
        
        return data;
      }

      catch {
        console.log('new user haha react')
      }
  }

  //all of my useEffects

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(user.email);
        if (data) {
          setDifficulty(data.difficulty);
          setTopics(data.topics);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
        <QuestionCard className = "qc" title = "Question 1" setDifficulty = {setDifficulty} setTopics = {setTopics} difficulty = {difficulty} topics = {topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT} offset = {0} offset2 = {0}/>
        <QuestionCard className = "qc" title = "Question 2" setDifficulty = {setDifficulty} setTopics = {setTopics} difficulty = {difficulty} topics = {topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT}  offset = {3} offset2 = {8}/>
        <QuestionCard className = "qc" title = "Question 3" setDifficulty = {setDifficulty} setTopics = {setTopics} difficulty = {difficulty} topics = {topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT}  offset = {6} offset2 = {16}/>
      </div>
      <div className = "auth-header">

      <div className="button-div" id = "save-button">
            <button onClick = {async () => {

              if (validate()) {
                popUpButton(); saveData(user.email, difficulty, topics);
              }

              else {

                popUpButton2();

              }
              
              
              }}className = 'sv-bt'>Save Changes</button>
            {showPopup && (
            <div className="retro-popup">
              <p>Saved!</p>
            </div>
          )}
          {showPopup2 && (
            <div className="retro-popup" id ="popup2">
              <p>Not Saved! Choose both difficulty and topic.</p>
            </div>
          )}
      </div>
    </div>
    </div>

  </div>
);
}
