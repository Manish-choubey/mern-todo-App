import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../redux/todoaction';

const Todo = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pending');
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ text, status }, auth.token));
    setText('');
  };

  const handleEdit = (todo) => {
    setEditing(true);
    setText(todo.text);
    setStatus(todo.status);
    setId(todo.id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo(id, { text, status }, auth.token));
    setEditing(false);
    setText('');
    setStatus('pending');
    setId('');
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id, auth.token));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Todo List</h3>
              <form onSubmit={editing ? handleUpdate : handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Add todo" value={text} onChange={(e) => setText(e.target.value)} required />
                </div>
                <div className="form-group">
                  <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">{editing ? 'Update' : 'Add'}</button>
              </form>
              <hr />
              <ul className="list-group">
                {todos.map((todo) => (
                  <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{todo.text}</span>
                    <div>
                      {todo.status === 'pending' && <span className="badge badge-primary mr-2">{todo.status}</span>}
                      {todo.status === 'in progress' && <span className="badge badge-warning mr-2">{todo.status}</span>}
                      {todo.status === 'done' && <span className="badge badge-info mr-2">{todo.status}</span>}
                      {todo.status === 'completed' && <span className="badge badge-success mr-2">{todo.status}</span>}
                      <button type="button" className="btn btn-primary mr-2" onClick={() => handleEdit(todo)}>Edit</button>
                      <button type="button" className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
   
)
}

export default Todo