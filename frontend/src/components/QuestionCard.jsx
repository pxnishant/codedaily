import React from 'react'
import { useState, useEffect } from 'react'
import Options from './Options'
export default function QuestionCard({title, setDifficulty, setTopics, difficulty, topics, handleOnChangeD, handleOnChangeT, offset, offset2}) {
  const [isVisible, setVisibility] = useState(false)
  const [text, setText] = useState('Add')

  useEffect(() => {
    if (difficulty && (difficulty[offset + 0] || difficulty[offset + 1] || difficulty[offset + 2])) {
      setVisibility(true);
      setText('Remove');
    }
  }, [difficulty, offset]);

  return (
    <div className="qcard">
      <div className="qtitle">{title}</div>
      <div className="button-div" id = "add-button">
          <button id = "add-button-el" className='add-bt' onClick = {() => {setVisibility(!isVisible); if (!isVisible) {setText('Remove')};
          
          if (isVisible) {

            setText('Add');
            const newDiff = difficulty.map((value, index) => {

              if (index === offset + 0 || index === offset + 1 || index === offset + 2) {
                return false;
              }

              return value;

            })

            const newTopics = topics.map((value, index) => {

              if (index === offset2 + 0 || index === offset2 + 1 || index === offset2 + 2 || index === offset2 + 3 || index === offset2 + 4 || index === offset2 + 5 || index === offset2 + 6 || index === offset2 + 7) {
                return false;
              }

              return value;

            })

            setDifficulty(newDiff)
            setTopics(newTopics)
          }}
            
            }>{text}</button>
      </div>
      {isVisible && <div className="qcontent"><Options difficulty = {difficulty} topics = {topics} handleOnChangeD = {handleOnChangeD} handleOnChangeT = {handleOnChangeT} offset = {offset} offset2 = {offset2}/></div>}
  </div>  
  )
}