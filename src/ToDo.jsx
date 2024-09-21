import React, { useState } from 'react';
import './ToDo.css';

function ToDo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (input.trim() === "") {
      alert("Please enter something!");
      return;
    }
    setTodos([...todos, { id: todos.length + 1, text: input.trim(), done: false }]);
    setInput('');
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = todo => {
    setEditId(todo.id);
    setEditInput(todo.text);
  };

  const saveEdit = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, text: editInput} : todo));
    setEditId(null);
    setEditInput('');
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

   return (
    <div className="todo-container">
      <h1>TODO APP</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter Your Todo..."
      />
      <button className="add-todo-btn" onClick={addTodo}>Add Todo</button>
      <button className="delete-all-btn" onClick={deleteAllTodos}>Delete All</button>
      {todos.map(todo => (
        <div key={todo.id} className="todo">
          {editId === todo.id ? (
            <>
              <input
                value={editInput}
                onChange={e => setEditInput(e.target.value)}
              />
              <button className="save-btn" onClick={() => saveEdit(todo.id)}>Save</button>
            </>
          ) : (
            <>
              <span>{todo.text}</span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button className="edit-btn" onClick={() => startEdit(todo)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ToDo;