import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, DISPLAY_ALERT, CLOSE_ALERT } from './types';
import store from '../store';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { popupAlert } from './alertsActions';


// Load User
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
    displayAlert();
  }
};

// Logout
export const logout = () => {
  store.dispatch({ type: LOGOUT });
};

const displayAlert = () => {
  store.dispatch({ type: DISPLAY_ALERT });
  setTimeout(closeAlert, 7000);
}

const closeAlert = () => {
  store.dispatch({ type: CLOSE_ALERT });
}

export const register = async FormData => {
  console.log(FormData)
  try {
    const res = await axios.post('/api/users/', FormData);
  } catch (err) {

  }
};