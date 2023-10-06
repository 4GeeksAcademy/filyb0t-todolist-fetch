import React, { useEffect, useState } from "react";
let urlBase ="https://playground.4geeks.com/apis/fake/todos/user/filyb0t"
// Create your first component
const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  
  const getTask = async () => {
    try {
      let response = await fetch(urlBase);
      let data = await response.json();
  
      if (response.ok) {
        
        const taskLabels = data.map(task => task.label);
        setTodos(taskLabels);
        
        if (response.status ==404)
        {
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const createUser = async () => {
    try {
      let response = await fetch(urlBase, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([...todos, inputValue]) // Actualiza la lista de tareas
      });
      if (response.ok) {
        getTask(); // Llama a la función getTask después de la actualización
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect (() =>{
getTask()

  },[])
  
 
 return (
    <div className="container">
      <h1>My to-do list</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                try {
                  let response = await fetch(urlBase, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify([...todos, inputValue])
                  });
                  if (response.ok) {
                    getTask();
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            }}
            
            placeholder="Agregar una tarea"
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            <i
              className="fas fa-trash-alt"
              onClick={() =>
                setTodos(todos.filter((_, currentIndex) => index !== currentIndex))
              }
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
