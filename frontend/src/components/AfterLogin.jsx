import React, { useState, useEffect } from 'react';
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


    const [difficulty, setDifficulty] = useState(new Array(9).fill(false))
    const [topics, setTopics] = useState(new Array(24).fill(false))

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

    useEffect(() => {
      console.log("difficulty", difficulty)
    }, [difficulty])

    useEffect(() => {
      console.log("topics", topics)
    }, [topics])


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(user.email);
        if (data) {
          console.log("ttttttt", data.difficulty)
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
        <QuestionCard className = "qc" title = "Question 1" difficulty = {difficulty} topics = {topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT} offset = {0} offset2 = {0}/>
        <QuestionCard className = "qc" title = "Question 2" difficulty = {difficulty} topics = {topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT}  offset = {3} offset2 = {8}/>
        <QuestionCard className = "qc" title = "Question 3" difficulty = {difficulty} topics = {topics} handleOnChangeD={handleOnChangeD} handleOnChangeT={handleOnChangeT}  offset = {6} offset2 = {16}/>
      </div>
      <div className = "auth-header">
      <div className="button-div" id = "save-button">
            <button onClick = {async () => {saveData(user.email, difficulty, topics);}}className = 'sv-bt'>Save Changes</button>
      </div>
    </div>
    </div>

  </div>
);
}
