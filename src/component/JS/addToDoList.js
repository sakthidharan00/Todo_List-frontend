
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/addToDoList.css';
import axios from "axios";

function AddTodo(props) {
    const [AddTask, setAddTask] = useState("");
    const newTask = () => {
        if (AddTask.trim() === "") {
            alert("Please enter Task .....");
            return
        }
        else {
            axios.post("https://todolist-backend-bnn4.onrender.com/home/task/add", { task: AddTask, isComplete: false }).then((val) => {
                setAddTask("");
                props.addTodo(val.data);

            }).catch((e) => { console.log(e.message) });

        }


    }

    return (
        <div className=' container input-task'>

            <div className='row '>
                <div className='col-md-10'>

                    <div className='input-group '>
                        <input className='form-control' type="text" placeholder='Add Task.....' value={AddTask} onChange={(e) => { setAddTask(e.target.value) }} />
                    </div>

                </div>
                <div className='col-md-2'>
                    <button className='btn btn-primary' onClick={newTask}>Add Task</button>
                </div>

            </div>












        </div>
    )

}

export default AddTodo;
