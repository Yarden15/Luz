import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";



const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('login success');
      return {
        ...state
      }
    case LOGIN_FAIL:
      console.log('login fail');
      return {
        ...state
      }
    default: return { ...state };

  }
}