import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div className="header mt-2">
        <h2>TodoList</h2>
        <Link to="/new">
          <button className="btn btn-primary">Add Todo</button>
        </Link>
      </div>
    </>
  );
}
