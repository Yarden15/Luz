import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, LOGOUT, DISPLAY_ALERT, CLOSE_ALERT, REGISTER_FAIL, SET_LOADING_AUTH } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  error: null,
  displayAlert: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      const newUser = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: newUser
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
        displayAlert: false,
        loading: false,
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
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case SET_LOADING_AUTH:
      return {
        ...state,
        loading: true
      }
    default:
      return { ...state };
  }
};
