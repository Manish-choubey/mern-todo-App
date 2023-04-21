import { ADD_TODO, DELETE_TODO, EDIT_TODO, FETCH_TODOS, UPDATE_TODO } from "../redux/Action";
import axios from "axios";

const apiUrl = "http://localhost:5000/list";

export const fetchTodos = () => dispatch => {
  axios.get(apiUrl).then(response =>
    dispatch({
      type: FETCH_TODOS,
      payload: response.data
    })
  );
};

export const addTodo = todo => dispatch => {
  axios.post(apiUrl, todo).then(response =>
    dispatch({
      type: ADD_TODO,
      payload: response.data
    })
  );
};

export const deleteTodo = id => dispatch => {
  axios.delete(`delete/${id}`).then(response =>
    dispatch({
      type: DELETE_TODO,
      payload: id
    })
  );
};

export const editTodo = todo => dispatch => {
  axios.put(`edit/${todo.id}`, todo).then(response =>
    dispatch({
      type: EDIT_TODO,
      payload: response.data
    })
  );
};
