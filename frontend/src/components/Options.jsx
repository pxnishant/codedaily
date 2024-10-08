import React from 'react'
import './options.css'

export default function Options({difficulty, topics, handleOnChangeD, handleOnChangeT, offset, offset2}) {

  return (
    <div>
    <form class ="my-form">
    <div class ="diff">
    <div class = "diff-inside">
      <input checked = {difficulty && difficulty[offset + 0]} onChange = {() => handleOnChangeD(offset + 0)} id="check-1" type="checkbox" />
      <label for="check-1">Easy</label>
    </div>
    <div class = "diff-inside">

      <input checked = {difficulty && difficulty[offset + 1]} onChange = {() => handleOnChangeD(offset + 1)} id="check-2" type="checkbox" />
      <label for="check-2">Medium</label>
    </div>
    <div class = "diff-inside">

      <input checked = {difficulty && difficulty[offset + 2]} onChange = {() => handleOnChangeD(offset + 2)} id="check-3" type="checkbox" />
      <label for="check-3">Hard</label>
    </div>
    </div>
    </form>
        <form class="my-form">
    <div>
      <input checked = {topics && topics[offset2 + 0]} onChange = {() => handleOnChangeT(offset2 + 0)} id="check-4" type="checkbox" />
      <label for="check-5">Basic Data Structures</label>
    </div>
    <div>
      <input checked = {topics && topics[offset2 + 1]} onChange = {() => handleOnChangeT(offset2 + 1)} id="check-5" type="checkbox" />
      <label for="check-5">Greedy / Binary Search</label>
    </div>
    <div>
      <input checked = {topics && topics[offset2 + 2]} onChange = {() => handleOnChangeT(offset2 + 2)} id="check-6" type="checkbox" />
      <label for="check-6">Strings</label>
    </div>
    <div>
      <input checked = {topics && topics[offset2 + 3]} onChange = {() => handleOnChangeT(offset2 + 3)} id="check-7" type="checkbox" />
      <label for="check-7">Recursion / Backtracking</label>
    </div>
    <div>
      <input checked = {topics && topics[offset2 + 4]} onChange = {() => handleOnChangeT(offset2 + 4)} id="check-8" type="checkbox" />
      <label for="check-8">Trees</label>
    </div>
    <div>
      <input checked = {topics && topics[offset2 + 5]} onChange = {() => handleOnChangeT(offset2 + 5)} id="check-9" type="checkbox" />
      <label for="check-9">Graphs</label>
    </div>
    <div>
      <input checked = {topics && topics[offset2 + 6]} onChange = {() => handleOnChangeT(offset2 + 6)} id="check-10" type="checkbox" />
      <label for="check-10">Dynamic Programming</label>
    </div>
    <div>
      <input checked = {topics && topics[offset2 + 7]} onChange = {() => handleOnChangeT(offset2 + 7)} id="check-11" type="checkbox" />
      <label for="check-11">Math / Bit Manipulation</label>
    </div>
  </form>
  </div>
  )
}

