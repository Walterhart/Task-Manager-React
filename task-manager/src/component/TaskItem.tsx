import React from 'react'
import { Task } from '../model/task-model';
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit, } from "react-icons/ai";
import {MdDone } from "react-icons/md";
import { useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import "./style.css"

// props structure
interface Props{
    index: number;
    task: Task; 
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    
}

const TaskItem = ({index, task, tasks, setTasks}: Props)  => {
    const [edit, setEdit] = React.useState<boolean>(false);
    const [editedTask, setEditedTask] = React.useState<string>(task.task);
    
    //  mark task as completed
    const completeTask = (id: number) => {
        setTasks(
          tasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
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
    };

    // focus variable
    const InputTaskRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        InputTaskRef.current?.focus();
    
    }, [edit])
    
  return (
    <Draggable draggableId = {task.id.toString()} index = {index}>
        {
            (provided) => (
    <form  className="tasks-item" onSubmit={(e) => editTask(e, task.id)} ref = {provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
    
    {/*edit task if icon clicked and edited*/}
    {edit ? (
            <input
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              className="task-item-text"
              ref={InputTaskRef}
            />
          ) : task.isCompleted? (
            <s className="task-item-text">{task.task}</s>
          ) : (
            <span className="task-item-text">{task.task}</span>
          )}
   
    <div className ="icon">
        <AiOutlineEdit onClick = {() => { if(!edit && !task.isCompleted){setEdit(!edit)}}}/>
        </div>
        <div className ="icon">
        <BsTrash onClick = {() => deleteTask(task.id)}/>
        </div>
        <div className ="icon">
        <MdDone onClick = {() => completeTask(task.id)}/>
    </div>
</form>
            )
        }
    
    </Draggable>
  )
}

export default TaskItem
