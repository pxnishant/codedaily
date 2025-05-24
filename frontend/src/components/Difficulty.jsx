import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();


export default function Difficulty( { handleDifficulty } ) {
    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' }
    
    ]
    
    return (
        <div className = 'w-full pb-5'>

            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti = {true}
                onChange={handleDifficulty}
                options = {options} className = 'text-zinc-800 min-w-65 w-[100%]'/>
       
        </div>
    )
}
