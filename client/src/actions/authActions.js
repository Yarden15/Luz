import { LOGIN_SUCCESS, LOGIN_FAIL, LOADED_USER, AUTH_ERROR } from './types'
import store from '../store';
import axios from 'axios';

const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  try {
    const res = await axios.get('/api/auth');
    console.log(res.data);
    store.dispatch({
      type: LOADED_USER,
      payload: res.data
    })
  } catch (error) {
    store.dispatch({
      type: AUTH_ERROR
    })
  }
};

export const login = async FormData => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log('user: ' + FormData.email + ' password: ' + FormData.password)
    const res = await axios.post('/api/auth', FormData, config);
    console.log('res : ' + res);
    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    loadUser();
    
  } catch (error) {
    store.dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg
    })
  };
}

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

