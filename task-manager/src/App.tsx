import React, { useState } from 'react';

import './App.css';
import InputForm from './component/InputForm';
import { Task } from './model/task-model';
import TaskList from './component/TaskList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


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
  
const onDragEnd = (result: DropResult) => {
  const { destination, source } = result;

  console.log(result);

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  let add;
  let active = tasks;
  let complete = completedTasks;
  
  

  if (source.droppableId === "task-to-do-list") {
    add = active[source.index];
    active.splice(source.index, 1);
  } else {
    add = complete[source.index];
    complete.splice(source.index, 1);
  }


  if (destination.droppableId === "task-to-do-list-completed") {
    active.splice(destination.index, 0, add);
  } else {
    complete.splice(destination.index, 0, add);
  }

  setCompletedTasks(complete);
  setTasks(active);
};
  return (
    <DragDropContext onDragEnd = {onDragEnd}>
    <div className="App">
      <h1 className='heading'> Task Manager</h1>
     <InputForm task= {task} setTask={setTask} addTask = {addTask}/>
     <TaskList tasks= {tasks} setTasks={setTasks} completedTasks = {completedTasks} setCompletedTasks = {setCompletedTasks} />
    </div>
    </DragDropContext>
  );
}

export default App;
