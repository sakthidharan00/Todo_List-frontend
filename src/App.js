import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import AddTodo from './component/JS/addToDoList';
import TodoList from './component/JS/TodoList';
import UpdateTask from './component/JS/UpdateTask';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [finalTask, setFinalTask] = useState([]);// entire task list in database
  const[IsEditClicked,setEditIcon]=useState(false);
  const[receviedTask,Setreceviedtask]=useState("");

  //getting data form server side
  useEffect(() => {
    axios.get("https://todolist-backend-bnn4.onrender.com/home/task/send").then((val) => {
      setFinalTask(val.data);


    }).catch((e) => { console.log(e.message); })
  }, []);

  //add task
  const addTodo = (val) => {

    const newTask = [...finalTask, val];
    setFinalTask(newTask);
  }

  //Remove Task
  const removeTask = (task) => {
    console.log(task)

    const newList = finalTask.filter(item => !(item._id == task._id));
    setFinalTask(newList);
  }

  //update TaskStatus
  const TaskStatus = (task) => {
    const newStatus = [...finalTask]
    newStatus.forEach(element => {
      if (element._id === task._id) {
        element.isComplete = task.isComplete;
      }
      setFinalTask(newStatus)

    });
  }
  const UpdateEvent=(val)=>{
   
    setEditIcon(val);
    
  }
  const ReUpdateTask=(val)=>{
    Setreceviedtask(val);

  }

  const FinalUpdatedTask=(task)=>{
    console.log(task)
    const updateStatus = [...finalTask];
    updateStatus.forEach(element => {
      if (element._id === task._id) {
        element.task=task.task;
        element.isComplete = task.isComplete;
      }
      setFinalTask(updateStatus)

    });


  }

  return <>
    <div className='container-fluid bg-primary'>
      <h3 className='display-3'>My ToDo List</h3>
      <AddTodo addTodo={addTodo} />
      <TodoList finalTask={finalTask} removeTask={removeTask} TaskStatus={TaskStatus} IsEdit={UpdateEvent} ReUpdateTask={ReUpdateTask}/>
       {IsEditClicked?<UpdateTask FinalUpdatedTask={FinalUpdatedTask} receviedTask={receviedTask} IsEdit={UpdateEvent}/>:""}

    </div>

  </>

}

export default App;
