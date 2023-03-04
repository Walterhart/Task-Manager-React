import "./style.css"
import { Task } from '../model/task-model';
import TaskItem from './TaskItem';
import { Droppable } from "react-beautiful-dnd";

interface Props{
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    completedTasks: Task[];
    setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const TaskList: React.FC<Props> = ({tasks,setTasks, completedTasks, setCompletedTasks}: Props) => {
    return ( 
        <div className="container">
         <div className="tasks">
            <Droppable droppableId="task-need-to-do">
            
             {
                (provided) => ( <div className="task-need-to-complete" ref ={provided.innerRef} {...provided.droppableProps}>
                <h2 className="task-header">Task to do</h2>
                {tasks.map((task, index) =>(
                    <TaskItem  index ={index} task = {task} key = {task.id} tasks = {tasks} setTasks = {setTasks} />
                ))}
                {provided.placeholder}
                 </div>)
             }
           
             </Droppable>
             <Droppable droppableId="completed-task">
                
                {
                    (provided) => ( <div className="task-completed" ref ={provided.innerRef} {...provided.droppableProps}>
                    <h2 className="task-header">Task completed</h2>
                    { completedTasks.map((task,index) =>(
                        <TaskItem index = {index} task = {task} key = {task.id} tasks = { completedTasks} setTasks = {setCompletedTasks} />
                    ))}
                   {provided.placeholder}
                </div>)
                }
             </Droppable>
      
        
         </div>
        </div>
     );
}
 
export default TaskList;
