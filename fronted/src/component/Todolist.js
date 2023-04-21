import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTodos } from "../actions/todoActions";

const TodoList = ({ todos, fetchTodos }) => {
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todo.todos
});

export default connect(mapStateToProps, { fetchTodos })(TodoList);
