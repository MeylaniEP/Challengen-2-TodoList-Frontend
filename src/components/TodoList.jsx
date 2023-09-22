import { useEffect, useState } from 'react';
import TodoItem from './TodoItem.jsx';

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch('http://localhost:8000/todos')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === 'AbortError') {
            console.log('fetch aborted.');
          }
        });
    }
  }, [isRefresh, setRefresh]);

  //filter data

  const filteredData = filter === 'all' ? todos : filter === 'complete' ? todos.filter((item) => item.complete === true) : filter === 'todo' && todos.filter((item) => item.complete === false);

  return (
    <>
      <div id="todo-header" className="flex d-flex justify-content-center mt-2">
        <h2>Search</h2>
        <div className="input-group">
          <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search Todo..." />
        </div>
      </div>
      <div className="btn-group listButton mt-2" role="group">
        <button
          className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
          onClick={() => {
            setFilter('all');
          }}
        >
          All
        </button>
        <button
          className={`btn btn-outline-success ${filter === 'complete' ? 'active' : ''}`}
          onClick={() => {
            setFilter('complete');
          }}
        >
          Done
        </button>
        <button
          className={`btn btn-outline-danger ${filter === 'todo' ? 'active' : ''}`}
          onClick={() => {
            setFilter('todo');
          }}
        >
          Todo
        </button>
      </div>

      <ul id="todo-list" className="list-group mt-3">
        {filteredData
          .filter((item) => {
            return search.toLowerCase() === '' ? item : item.task.toLowerCase().includes(search);
          })
          .map((todo) => (
            <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
          ))}
      </ul>
    </>
  );
};

export default TodoList;
