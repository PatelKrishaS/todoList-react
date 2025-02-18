"use client"
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';



const page = () => {
  const [task, setTask] = useState("")
  const [desc, setDesc] = useState("")
  const [mainTask, setMainTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log(task);
    // console.log(desc);
    setMainTask([...mainTask, {task, desc}])
    setTask("")
    setDesc("")
    console.log(mainTask);
    
  }
  const deleteHandler = (i) => {
      let copyTask = [...mainTask]
      copyTask.splice(i, 1)
      setMainTask(copyTask)
  }

  const toggleCompletion = (i) => {
    const updatedTasks = mainTask.map((task, index) => {
      if (index === i) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setMainTask(updatedTasks)
  }

  let renderTask = <h2>No Task Available!</h2>
  if(mainTask.length>0){
    renderTask = mainTask.map((t, i) => {
      return( 
        <li key={i} className='flex items-center ml-20 justify-between'>
          <div className='flex '>
            <button onClick={() => toggleCompletion(i)} className='text-green-500 hover:text-green-700 w-14 flex-none'>
              {t.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </button>
            <div className={`text-2xl font-semibold w-64 flex-auto ${t.completed ? 'line-through text-gray-500' : ''}`}>
              {t.task}
            </div>
            <h6 className='text-lg font-medium w-32 flex-auto'>{t.desc}</h6>
          </div>
          <button onClick={ () => {
             deleteHandler(i)
          }
          } className="text-red-500 hover:text-red-700 mr-20">
            <DeleteIcon/>
          </button>
        </li>
      )
    })
  }

  return (
    <>
    <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>My Todo List</h1>
    <form onSubmit={submitHandler}>
      <input type="text" 
      className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2'
       placeholder='Enter task here'
       value={task}
       onChange={(e) =>{
        // console.log(e.target.value);
        setTask(e.target.value)
        // console.log(e.target.value);

       }}
        />
      <input type="text" 
      className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2 w-1/2' 
      placeholder='Enter description here' 
      value={desc}
      onChange={(e) => {
        setDesc(e.target.value)
      }}
      />
      <button className='bg-black text-white px-4 py-3 font-bold rounded m-5'>Add Task</button>
    </form>
    <hr />
    <div className='p-8 bg-slate-200'>
        <ul>
          {renderTask}
        </ul>
    </div>
    </>
  )
}

export default page