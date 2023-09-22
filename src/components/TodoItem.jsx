import React, { useState } from 'react';

const TodoItem = ({ todo, setRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log('todo updated.');
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'DELETE',
    }).then(() => {
      console.log('todo deleted.');
      setRefresh(true);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    todo.task = editedTask;

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log('todo edited.');
      setIsEditing(false);
      setRefresh(true);
    });
  };

  const handleEditCancel = () => {
    setEditedTask(todo.task);
    setIsEditing(false);
  };

  return (
    <li className={`list-group-item ${todo.complete ? 'list-group-item' : ''}`}>
      {isEditing ? (
        <div className="d-flex">
          <input type="text" className="form-control" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
          <button
            className="btn btn-success mx-2"
            onClick={() => {
              handleEditSave();
            }}
          >
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleEditCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={todo.complete}
            onChange={() => updateTodo()}
          />
          <div
            className={`flex-grow-1 ${todo.complete ? 'text-decoration-line-through text-danger' : ''}`}
          >
            {todo.task}
          </div>
          <button className="btn btn-warning mx-2" onClick={handleEdit}>
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteTodo();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
