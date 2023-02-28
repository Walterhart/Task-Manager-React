import { useRef } from "react";
import "./style.css"

 // props structure
interface Props{
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    addTask: (e: React.FormEvent) => void;
}
const InputForm: React.FC<Props>= ({task, setTask, addTask}) => 
{
    
    const inputRef = useRef<HTMLInputElement>(null);
    return (  
        <div>
            <form className = "input" 
            onSubmit = {(e) => {addTask(e);

             /* Handle background shadow after typing*/ 
             inputRef.current?.blur();
             }}
             >
            <input type ='input' placeholder = 'Enter a task'  className = "input-el" onChange={ (e) => setTask(e.target.value)}/>
            <button type ='submit' className = "btn-el">Submit</button>
            </form>
        </div>
    );
}
 
export default InputForm;