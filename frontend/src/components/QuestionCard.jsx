import React from 'react'
import { useState } from 'react'
import Options
 from './Options'
export default function QuestionCard({title, handleOnChangeD, handleOnChangeT, offset, offset2}) {
  const [isVisible, setVisibility] = useState(false)
  const [text, setText] = useState('Add')

  return (
    <div className="qcard">
      <div className="qtitle">{title}</div>
      <div className="button-div" id = "add-button">
          <button id = "add-button-el" className='add-bt' onClick = {() => {setVisibility(!isVisible); if (!isVisible) setText('Remove'); if (isVisible) setText('Add')}}>{text}</button>
      </div>
      {isVisible && <div className="qcontent"><Options handleOnChangeD = {handleOnChangeD} handleOnChangeT = {handleOnChangeT} offset = {offset} offset2 = {offset2}/></div>}
  </div>
  )
}