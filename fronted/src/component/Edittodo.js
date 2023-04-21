import React, { useState } from "react";
import { connect } from "react-redux";
import { editTodo } from "../actions/todoActions";

const EditTodoForm = ({ todo, editTodo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = e => {
    e.preventDefault();
    const updatedTodo = { ...todo, title, description };
    editTodo(updatedTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Update Todo</button>
    </form>
  );
};

export default connect(null, { editTodo })(EditTodoForm);
