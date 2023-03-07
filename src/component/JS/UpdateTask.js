
import { useState } from "react";
import "../CSS/UpdateTask.css";
import axios from "axios";


function UpdateTask(props) {
    const task = props.receviedTask;
    const [Newtask, setNewTask] = useState(task.task);


    const update = () => {
      
        axios.put(`http://localhost:8080/home/task/update/${task._id}`, {
            _id: task._id,
            task: Newtask,
            isComplete: task.isComplete
        }).then((doc) => {
            props.FinalUpdatedTask(doc.data);
            props.IsEdit(false);
            console.log(doc.data)



        }).catch((e) => { console.log(e.message) })
    }



    return (
        <div className=" container-fluid UpdateTask">
            <div className=" container ut">
                <div className="  input-group">
                    <input type="text " className="form-control" placeholder="Update task to....." value={Newtask} onChange={(e) => setNewTask(e.target.value)} />
                </div>
                <button className="btn btn-success" onClick={update}>Update</button>
            </div>

        </div>
    )

}

export default UpdateTask;