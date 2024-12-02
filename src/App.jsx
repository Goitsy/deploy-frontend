import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/todos");
        console.log(response);
        setTodos(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Unable to connect to the server. Please try again later.");
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/todos", {
        name: newTodo,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
      setError("Failed to add todo. Please try again.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete todo. Please try again.");
    }
  };

  return (
    <div className="app">
      <h1>Todos</h1>

      {error && <div className="error">{error}</div>}

      <div>
        <input
          type="text"
          placeholder="Enter todo name"
          value={newTodo}
          onChange={(e) => {
            setError(null);
            setNewTodo(e.target.value);
          }}
        />
        <button onClick={addTodo}>Add todo</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.todo}
            <button className="del-btn" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
