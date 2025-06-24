import React, { useEffect, useState } from 'react'
import Header from './Header'
import Problem from './Problem'

export default function HomePostLogin() {
  const [problems, setProblems] = useState([])
  const [problemsData, setProblemsData] = useState([])
  const [saveStatus, setSaveStatus] = useState("idle")

  const protocol = import.meta.env.VITE_PROTOCOL;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      const url = `${protocol}${backendURL}/getData`

      fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json()) 
        .then(data => {
          if (Array.isArray(data.problems) && data.problems.length > 0) {
            const ids = data.problems.map(p => p.id)
            setProblems(ids)
            setProblemsData(data.problems)
          }
        })
        .catch(err => console.error("Fetch error:", err))
    }
  }, [])

  const handleAddButton = () => {
    const newID = Date.now().toString() 
    setProblems(prev => [...prev, newID])
    setProblemsData(prev => [...prev, { id: newID, difficulty: [], tags: [] }])
  }

  const hasInvalidProblems = problemsData.some(p =>
    !Array.isArray(p.difficulty) || p.difficulty.length === 0 ||
    !Array.isArray(p.tags) || p.tags.length === 0
  )
  
  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    const validProblems = problemsData.filter(p => 
      Array.isArray(p.difficulty) && p.difficulty.length > 0 &&
      Array.isArray(p.tags) && p.tags.length > 0
    );
  
    if (validProblems.length !== problemsData.length) {
      alert("Hey! All problems need to have difficulty and tags.");
      return;
    }
  
    setSaveStatus("saving");
  
    const url = `${protocol}${backendURL}/updateProblems`;
  
    fetch(url, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ problems: validProblems })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Save successful:", data);
        setSaveStatus("saved");
        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);
      })
      .catch(err => {
        console.error("Save error:", err);
        setSaveStatus("idle");
      });
  };
  
  return (
    <div className='flex flex-col items-center h-full w-full gap-20'>
      <Header isLoggedIn={true} />

      <div className='w-1/2 py-10 flex flex-col gap-5 justify-center items-center'>
        {
          problems.map((id) => (
            <Problem
              key={id}
              id={id}
              index={problems.findIndex(val => val === id)}

              handleDifficulty={(choice) => {
                setProblemsData(problemsData.map(val =>
                  val.id === id ? { ...val, difficulty: choice } : val
                ))
              }}

              handleTags={(choice) => {
                setProblemsData(problemsData.map(val =>
                  val.id === id ? { ...val, tags: choice } : val
                ))
              }}

              valueTags = { problemsData.find(val => val.id === id)?.tags || [] }

              valueDiff = { problemsData.find(val => val.id === id)?.difficulty || [] }

              onClose={() => {
                setProblems(problems.filter(tempid => tempid !== id))
                setProblemsData(problemsData.filter(val => val.id !== id))
              }}
            />
          ))
        }

        {problems.length === 0 && (
          <h1 className='text-xl md:text-2xl font-bold my-4'>
            Add your first problem
          </h1>
        )}

        <div className='flex gap-5'>
          <button onClick={handleAddButton} className='rounded-sm bg-zinc-700 w-1/5 min-w-30 min-h-10 h-10 hover: cursor-pointer transition-transform duration-300 ease-in-out hover:translate-y-1 rounde font-bold'>Add</button>
          <button
            onClick={handleSave}
            disabled={hasInvalidProblems || saveStatus === "saving"}
            className={`bg-zinc-700 w-1/5 min-w-30 min-h-10 h-10 rounded-sm font-bold transition-all duration-300 ease-in-out ${
              hasInvalidProblems || saveStatus === "saving"
                ? "opacity-50 cursor-not-allowed"
                : "hover:cursor-pointer hover:translate-x-1"
            }`}>{saveStatus === "saved" ? "Saved ✓" : saveStatus === "saving" ? "Saving..." : "Save"}</button>

       </div>
      </div>
    </div>
  )
}
