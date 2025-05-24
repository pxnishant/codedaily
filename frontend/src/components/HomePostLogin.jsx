import React, { useEffect, useId, useState } from 'react'
import Header from './Header'
import Problem from './Problem'

export default function HomePostLogin() {

  const [problems, setProblems] = useState([])
  const [problemsData, setProblemsData] = useState([])

  useEffect(() => {

    console.log(problemsData)

  }, [problemsData])


  const handleAddButton = () => {
    const newID = Date.now();
    setProblems([...problems, newID])
    setProblemsData([...problemsData, {id: newID, difficulty: [], tags: [] }])
  }

  return (
    <div className='flex flex-col items-center h-full w-full gap-20'>
      <Header></Header>
      
      <div className='w-1/2 py-10 flex flex-col gap-5 justify-center items-center'>

      {
        //.map runs again everytime the state changes

        problems.map((id) => {

          return <Problem id = { id }
          
          handleDifficulty = { (choice) => {

            setProblemsData(

              problemsData.map((val) => 

                val.id == id ? { ...val, difficulty: choice } : val

              )

            ) 
          
          } }

          handleTags = { (choice) => {

            setProblemsData(

              problemsData.map((val) => 

                val.id == id ? { ...val, tags: choice } : val

              )

            ) 
          
          } }
          
          onClose = {() => {

            setProblems(problems.filter((tempid) => {

              return (tempid != id);

            }))

            setProblemsData(

              problemsData.filter((val) => {

                return (val.id != id);
                
              })

            ) 


          }}
          
          index = { 

            problems.findIndex((val) => (val == id))
          } 
           ></Problem>
        })
      }
      
      {problems.length === 0 && (
        <h1 className='text-xl md:text-2xl font-bold my-4'>
          Add your first problem
        </h1>
      )}

      <button onClick = {handleAddButton} className='w-1/5 min-w-30 min-h-10 h-10 hover: cursor-pointer transition-transform duration-300 ease-in-out hover:translate-y-1 rounded bg-stone-100 text-zinc-900 font-bold '>Add Problem</button>

      </div>

    </div>
  )
}
