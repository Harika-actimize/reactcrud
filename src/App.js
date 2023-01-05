import { useState } from "react";
import "./App.css";

export default function App() {
  // need a state to keep track of todos
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  // need state to keep track of the value in the input
 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [age, setAge] = useState("");
  // function to create a new object on form submit
  function handleFormSubmit(e) {
    console.log("??????????",firstName,lastName,designation,age);
    // prevent the browser default behavior or refreshing the page on submit
    e.preventDefault();

    // don't submit if the input is an empty string
    if (firstName !== ""&&lastName !==""&&designation !==""&&age !=="") {
      // set the new todos state (the array)
      setTodos([
        // copy the current values in state
        ...todos,
        {
          // setting a basic id to identify the object
          id: todos.length + 1,
          // set a text property to the value of the todo state and 
          // trim the whitespace from the input
          fname: firstName.trim(),
          lname:lastName.trim(),
          desig:designation.trim(),
          age:age.trim()
        }
      ]);
    }
    // clear out the input box
    setFirstName("");
    setLastName("");
    setDesignation("");
    setAge("");
  }

  function resetStates (){
    setFirstName("");
    setLastName("");
    setDesignation("");
    setAge("");
    setIsEditing(false)
  }

    function handleDeleteClick(id) {
      // alert("hai")
      const removeItem = todos.filter((todo) => {
        console.log("+++++++++++++",id)
        return todo.id !== id;
      });
      console.log(">>>>>>",removeItem)
      setTodos(removeItem);

    }
    function handleEditClick(todo) {
      // alert("hai")
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",todo)
      // set editing to true
      setIsEditing(true);
      setFirstName(todo.fname);
      setLastName(todo.lname);
      setDesignation(todo.desig);
      setAge(todo.age);
      // set the currentTodo to the todo item that was clicked
      setCurrentTodo({ ...todo });
      console.log("fsdsdd",setCurrentTodo)
    }

    function updateRecord(e){
      e.preventDefault()
        console.log("currentTodo",currentTodo)
      const updatedItem = todos.map((todo)=>{
        if(todo.id === currentTodo.id){
          todo ={
            ...todo,
            fname :firstName,
            lname:lastName,
            desig: designation,
            age: age
          }
        }
         return todo;
      })
      setTodos(updatedItem) 
      resetStates()
    }
    
  return (
    <div className="App">
       
      <form>
        {/* we've added an h2 element */}
        {isEditing?<h2>Edit Todo</h2>:<h2>Add Todo</h2>}
          {/* also added a label for the input */}
          {/* {isEditing} */}
          <label htmlFor="todo">firstName: </label>
          <input
        name="todo"
         type="text"
         placeholder="First name"
         value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />
         <label htmlFor="todo"> LastName: </label>
        <input
        name="todo"
         type="text"
         placeholder="Last name"
         value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />
         <label htmlFor="todo"> Designation: </label>
         <input
         name="todo"
          type="text"
    placeholder="Designation"
         value={designation}
           onChange={(e) => setDesignation(e.target.value)}
         />
         <label htmlFor="todo"> Age: </label>
         <input
        name="todo"
         type="text"
         placeholder="Age"
         value={age}
        onChange={(e) => setAge(e.target.value)}
        />
      {isEditing?
      <>
       <button onClick={updateRecord}>Update</button>
       <button onClick={() => setIsEditing(false)}>Cancel</button>

       </>:
        <button className="buttonAdd"
         onClick={handleFormSubmit}>
       Add
        </button>}
    </form> 
    
      <h2>Employe Table</h2>
      <table className="center">
      <thead>
        <tr>
        <th>SNo</th>
          <th>Full Name</th>
          <th>Designation </th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {todos.map((item)=>(
            <tr>
            <th>{item.id}</th>
            <th>{item.fname} {item.lname}</th>
            <th>{item.desig}</th>
            <th>{item.age}</th>
            <th><button className="button" onClick={() => handleEditClick(item)}>Edit</button><button className="buttonDelete"button onClick={() => handleDeleteClick(item.id)}>Delete</button></th>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
