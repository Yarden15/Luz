import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, DISPLAY_ALERT, CLOSE_ALERT, REGISTER_FAIL, SET_LOADING_AUTH } from './types';
import store from '../store';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { popupAlert } from './alertsActions';

// Load User
export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  if (store.getState().auth.user === null)
    setLoadingUser();
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

export const displayAlert = () => {
  store.dispatch({ type: DISPLAY_ALERT });
  setTimeout(closeAlert, 7000);
}

const closeAlert = () => {
  store.dispatch({ type: CLOSE_ALERT });
}

export const register = async FormData => {
  try {
    const res = await axios.post('/api/users/', FormData);
    popupAlert('congratulations', res.data, 'regular');
    return true;
  } catch (err) {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });
    displayAlert();
    return false;
  }
};

export const updateError = (msg) => {
  store.dispatch({
    type: REGISTER_FAIL,
    payload: msg
  });
}

const setLoadingUser = () => {
  store.dispatch({
    type: SET_LOADING_AUTH
  });
}