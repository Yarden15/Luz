import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, LOGOUT, DISPLAY_ALERT, CLOSE_ALERT } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  error: null,
  displayAlert: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      console.log('login success');
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        displayAlert: false
      };
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case DISPLAY_ALERT:
      return {
        ...state,
        displayAlert: true
      }
    case CLOSE_ALERT:
      return {
        ...state,
        displayAlert: false
      }
    default:
      return { ...state };
  }
};
