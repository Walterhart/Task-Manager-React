import React, { useState } from 'react';

import './App.css';
import InputForm from './component/InputForm';
import { Task } from './model/task-model';
import TaskList from './component/TaskList';
import { DragDropContext } from 'react-beautiful-dnd';


const App: React.FC = () => {
  
  const [task, setTask] = useState('');

  // array of Task
  // follow Task interfact structure
  const [tasks, setTasks] = useState<Task[]>([]);

  // variable for state of task-items
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const addTask = (e: React.FormEvent) =>{
    e.preventDefault();

    // if task exist set task into tasks
    if(task){
      setTasks([...tasks,  { id: Date.now(), task: task ,isCompleted: false}]);
      setTask('');
    }
  };
  
  return (
    <DragDropContext onDragEnd = {()=>{}}>
    <div className="App">
      <h1 className='heading'> Task Manager</h1>
     <InputForm task= {task} setTask={setTask} addTask = {addTask}/>
     <TaskList tasks= {tasks} setTasks={setTasks} completedTasks = {completedTasks} setCompletedTasks = {setCompletedTasks} />
    </div>
    </DragDropContext>
  );
}

export default App;
