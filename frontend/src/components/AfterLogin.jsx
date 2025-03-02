import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import Header from './Header';
import './Popup.css'

export default function AfterLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [difficulty, setDifficulty] = useState(new Array(9).fill(false));
  const [topics, setTopics] = useState(new Array(24).fill(false));
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/checklogin`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.isAuthenticated) {
          setEmail(data.email);
        } else {
          localStorage.removeItem("token");
          navigate("/"); // Redirect if not authenticated
        }
      })
      .catch(error => {
        console.error("Authentication error:", error);
        localStorage.removeItem("token");
        navigate("/"); // Redirect on error
      });
    }
  }, [navigate]); // Add navigate to dependency array

  // Load user preferences
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const data = await getData(email);
          if (data) {
            setDifficulty(data.difficulty);
            setTopics(data.topics);
          }
        }
        else {
          console.log("No email to fetchData for");
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email]); // Add email to dependency array

  const logout = () => {
    localStorage.removeItem("token"); // Use removeItem instead of clear
    navigate("/", { replace: true });
    window.location.reload();
  };

  function popUpButton() {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  function popUpButton2() {
    setShowPopup2(true);
    setTimeout(() => {
      setShowPopup2(false);
    }, 3000);
  };

  
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

  const handleOnChangeT = (position) => {
    const updatedArr = topics.map((item, index) =>
      index === position ? !item : item
    );
    setTopics(updatedArr);
  }

  const handleOnChangeD = (position) => {
    const updatedArr = difficulty.map((item, index) =>
      index === position ? !item : item
    );
    setDifficulty(updatedArr);
  }

  async function saveData(email, difficulty, topics) {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/updateuser`, {
        method: `POST`,
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty: difficulty,
          topics: topics
        })
      }).then(() => console.log('request to update successfully sent'))  
    }
  }

  async function getData(email) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getdata`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log('Error getting data or new user');
      return null;
    }
  }

  return (
    <div className="auth-main">
      <div className="auth-header">
        <Header/>
        <div className="button-div" id="logout-button">
          <button className='lgo-bt' onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="auth-body">
        <div className="questions">
          <QuestionCard className="qc" title="Question 1" setDifficulty={setDifficulty} setTopics={setTopics} difficulty={difficulty} topics={topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT} offset={0} offset2={0}/>
          <QuestionCard className="qc" title="Question 2" setDifficulty={setDifficulty} setTopics={setTopics} difficulty={difficulty} topics={topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT} offset={3} offset2={8}/>
          <QuestionCard className="qc" title="Question 3" setDifficulty={setDifficulty} setTopics={setTopics} difficulty={difficulty} topics={topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT} offset={6} offset2={16}/>
        </div>
        <div className="auth-header">
          <div className="button-div" id="save-button">
            <button onClick={async () => {
              if (validate()) {
                popUpButton(); 
                saveData(email, difficulty, topics); // Use email state, not user.email
              } else {
                popUpButton2();
              }
            }} className='sv-bt'>Save Changes</button>
            {showPopup && (
              <div className="retro-popup">
                <p>Saved!</p>
              </div>
            )}
            {showPopup2 && (
              <div className="retro-popup" id="popup2">
                <p>Not Saved! Choose both difficulty and topic.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}