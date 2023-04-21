import jwtDecode from 'jwt-decode';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const ADD_TODO = 'ADD_TODO'
  export const DELETE_TODO='DELETE_TODO'
  export const EDIT_TODO = 'EDIT_TODO'
  export const FETCH_TODOS = 'FETCH_TODOS'
  export const UPDATE_TODO= 'UPDATE_TODO'

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      const decodedToken = jwtDecode(data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: { token: decodedToken } });
      localStorage.setItem('token', data.token);
    } else {
      dispatch({ type: LOGIN_ERROR, payload: { error: data.message } });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: LOGIN_ERROR, payload: { error: 'An error occurred' } });
  }
};

export const signup = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      const decodedToken = jwtDecode
      dispatch({ type: SIGNUP_SUCCESS, payload: { token: decodedToken } });
      localStorage.setItem('token', data.token);
    } else {
      dispatch({ type: SIGNUP_ERROR, payload: { error: data.message } });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: SIGNUP_ERROR, payload: { error: 'An error occurred' } });
  }
};