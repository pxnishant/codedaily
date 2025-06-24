import React from 'react'
import TopicSelector from './TopicSelector'
import Difficulty from './Difficulty'

export default function Problem({ id, handleDifficulty, handleTags, onClose, index, valueTags, valueDiff }) {
  return (
    <div className='relative w-3/5 min-w-80 p-5 md:p-10 bg-zinc-800 h-full flex flex-col rounded-lg border border-zinc-700 shadow-xl'>
      
      <button
        onClick={onClose}
        className='absolute top-1 right-5 hover:text-zinc-400 text-3xl font-bold focus:outline-none'
        aria-label="Close"
      >
        &times;
      </button>
      
      <h1 className='text-2xl md:text-3xl font-semibold pb-5 self-center'>
        Problem { index + 1 }
      </h1>
      <h1 className='text-md font-semibold pb-2'>
        Difficulty
      </h1>

      <Difficulty valueDiff = { valueDiff } handleDifficulty = { handleDifficulty } />

      <h1 className='text-md font-semibold pb-2'>
        Add Tags
      </h1>
      <TopicSelector valueTags = { valueTags } handleTags={handleTags} />
    </div>
  )
}
