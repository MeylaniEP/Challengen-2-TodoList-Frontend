import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Header = () => {
  const handleClick = (title) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const [task, setTask] = useState('');

  // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
  const addTodo = () => {
    const newTodo = { task, complete: false };

    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string
      setTask('');
    });
  };

  return (
    <>
     <div className="mt-2 d-flex flex-column justify-content-center align-items-center">
      <Container className="mt-2">
        <Row className="header">
          <div id="todo-header">
            <h2>TodoList</h2>
            <div className="input-group">
              <input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add Todo..." />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleClick('Item berhasil ditambahkan!');
                    addTodo();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Row>

        <Row className="mt-2">
          <Col className="col-5"></Col>
          <Col>
            <Link to="/">
              <span className="add-back btn btn-outline-primary">Back to Home</span>
            </Link>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Header;
