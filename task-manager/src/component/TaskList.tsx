import "./style.css"
import { Task } from '../model/task-model';
import TaskItem from './TaskItem';

interface Props{
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const TaskList: React.FC<Props> = ({tasks,setTasks}: Props) => {
    return ( 
        <div className="tasks">
            {tasks.map((task) =>(
                <TaskItem task = {task} key = {task.id} tasks = {tasks} setTasks = {setTasks} />
            ))}
        </div>
     );
}
 
export default TaskList;