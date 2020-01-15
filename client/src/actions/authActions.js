import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './types';
import store from '../store';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

<<<<<<< HEAD
=======
// Load User
>>>>>>> a2b835de4d54c49ec8f17a4ee321d436d7ea1294
export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    store.dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    store.dispatch({
      type: AUTH_ERROR
    });
  }
};
// Login User
export const login = async FormData => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth', FormData, config);
    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    loadUser();
  } catch (err) {
    store.dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg
    });
  }
};

// Logout
export const logout = () => {
  store.dispatch({ type: LOGOUT });
};
