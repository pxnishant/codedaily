import React from 'react'
import { useState, useEffect } from 'react'
import Options
 from './Options'
export default function QuestionCard({title, difficulty, topics, handleOnChangeD, handleOnChangeT, offset, offset2}) {
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
          <button id = "add-button-el" className='add-bt' onClick = {() => {setVisibility(!isVisible); if (!isVisible) setText('Remove'); if (isVisible) setText('Add')}}>{text}</button>
      </div>
      {isVisible && <div className="qcontent"><Options difficulty = {difficulty} topics = {topics} handleOnChangeD = {handleOnChangeD} handleOnChangeT = {handleOnChangeT} offset = {offset} offset2 = {offset2}/></div>}
  </div>
  )
}