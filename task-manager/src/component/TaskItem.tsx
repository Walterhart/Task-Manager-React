import React from 'react'
import { Task } from '../model/task-model';
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit, } from "react-icons/ai";
import {MdDone } from "react-icons/md";
import { useRef, useEffect } from 'react';

// props structure
interface Props{
    task: Task; 
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem = ({task, tasks, setTasks}: Props)  => {
    const [edit, setEdit] = React.useState<boolean>(false);
    const [editedTask, setEditedTask] = React.useState<string>(task.task);
    
    //  mark task as completed
    const completeTask = (id: number) => {
        setTasks(tasks.map((task) => task.id === id? {...task, completed: !task.isCompleted} : task));
    };

    // delte task base on id
    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));

    };

    // edit task base on id
    const editTask = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTasks(tasks.map((task) => task.id === id? {...task, task:editedTask} : task));
        setEdit(false)
    }

    // focus variable
    const InputTaskRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        InputTaskRef.current?.focus();
    
      
    }, [edit])
    


  return (

    // edit task if icon clicked and edited
    <form  className="tasks-item" onSubmit={(e) => editTask(e, task.id)}>
        {
            edit ? (<input className ="task-item-text" value = {editedTask} onChange = {(e) => setEditedTask(e.target.value)}/>):(        
                    task.isCompleted ? ( <s className="tasks-item-text">{task.task}</s>) : ( <span className="tasks-item-text">{task.task}</span>)
            )
        }
       
       
        <div className ="icon">
            <AiOutlineEdit onClick = {() => { if(!edit && !task.isCompleted){setEdit(!edit)}}}/>
            <BsTrash onClick = {() => deleteTask(task.id)}/>
            <MdDone onClick = {() => completeTask(task.id)}/>
        </div>
    </form>
  )
}

export default TaskItem