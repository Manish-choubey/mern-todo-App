import React from "react";
import { connect } from "react-redux";
import { deleteTodo } from "../actions/todoActions";

const TodoItem = ({ todo, deleteTodo }) => {
  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default connect(null, { deleteTodo })(TodoItem);
