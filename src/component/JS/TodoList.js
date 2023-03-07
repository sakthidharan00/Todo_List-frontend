import react from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/TodoList.css";
import ModeIcon from '@mui/icons-material/Mode';
import CloseIcon from '@mui/icons-material/Close';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import axios from "axios";
import UpdateTask from "./UpdateTask";



function TodoList(props) {

    const taskList = props.finalTask.map((Task, index) => {
        console.log(props.finalTask.length);

        const RemoveTask = (value) => {

            axios.delete(`http://localhost:8080/home/task/delete/${value._id}`).then((doc) => {
                props.removeTask(doc.data);

            }).catch((e) => { console.log(e.message) })

        }
        const taskStatus = (val) => {

            axios.put(`http://localhost:8080/home/task/update/${val._id}`, {
                _id: val._id,
                task: val.task,
                isComplete:true
            }).then((doc) => {

                props.TaskStatus(doc.data);
              }).catch((e) => { console.log(e.message) })

        }
        const UpdateEvent=(val)=>{
            props.IsEdit(true);
            props.ReUpdateTask(val);
           


        }
        return (<>
            
           
                
           
             <div className="list-group-item">
                
             <div className="Task_Status">
                    <HourglassBottomIcon className={`pending ${Task.isComplete ? 'invisible' : 'visible'} `} />
                    <TaskAltIcon className={`completed ${Task.isComplete ? 'visible' : 'invisible'} `} />
                </div>
                <li key={index} onClick={() => { taskStatus(Task) }} >{Task.task}</li>
                <div className="icons">
                    <ModeIcon className=" icon edit" onClick={()=>{UpdateEvent(Task)}}/>
                    <CloseIcon className=" icon cancel" onClick={() => { RemoveTask(Task) }} />
                </div>
            </div>

            

          </>

        );
    })


    return (
        <div className={` container TodoList ${props.finalTask.length>0?"":"background"} ` }>

            
            <ul className="list-group  ">
           
                {taskList}
            </ul>

        </div>
    );
}


export default TodoList;