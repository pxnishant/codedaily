import React from 'react'
import './options.css'
export default function Options() {
  return (
    <div>

    <form class ="my-form">
    <div class ="diff">
    <div class = "diff-inside">
      <input id="check-1" type="checkbox" />
      <label for="check-1">Easy</label>
    </div>
    <div class = "diff-inside">

      <input checked="" id="check-2" type="checkbox" />
      <label for="check-2">Medium</label>
    </div>
    <div class = "diff-inside">

      <input id="check-3" type="checkbox" />
      <label for="check-3">Hard</label>
    </div>
    </div>
    </form>
        <form class="my-form">
    <div>
      <input id="check-1" type="checkbox" />
      <label for="check-1">Basic Data Structures</label>
    </div>
    <div>
      <input checked="" id="check-2" type="checkbox" />
      <label for="check-2">Greedy</label>
    </div>
    <div>
      <input id="check-3" type="checkbox" />
      <label for="check-3">Binary Search</label>
    </div>
    <div>
      <input id="check-4" type="checkbox" />
      <label for="check-4">Dynamic Programming</label>
    </div>
    <div>
      <input id="check-4" type="checkbox" />
      <label for="check-4">Graphs</label>
    </div>
    <div>
      <input id="check-4" type="checkbox" />
      <label for="check-4">Other Topics</label>
    </div>
  </form>
  </div>
  )
}

