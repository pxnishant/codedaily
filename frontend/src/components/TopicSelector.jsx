import React from "react";
import { useState, useEffect } from "react";

import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
import Select from 'react-select'

const TopicSelector = ({ handleTags, valueTags }) => {

    const options = [
        { value: 'Arrays', label: 'Arrays' },
        { value: 'Binary Search', label: 'Binary Search' },
        { value: 'Sliding Window', label: 'Sliding Window' },
        { value: 'Greedy', label: 'Greedy' },
        { value: 'Graphs', label: 'Graphs' }
      ]
    
    return (
        <div className = 'w-full'>

            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti = {true}
                onChange={handleTags}
                value = { valueTags }
                options = {options} className = 'text-zinc-800 min-w-65 w-[100%]'/>
       
        </div>
    )
}

export default TopicSelector;