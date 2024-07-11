import { useState, useEffect } from 'react'
import  CreateTodo  from './components/CreateTodo'
import Todo from './components/Todo'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3000/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await res.json();
        setTodos(json.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  },[todos]);
  return (
    <>
      <CreateTodo/>
      <Todo todos={todos}/>
    </>
  )
}

export default App
