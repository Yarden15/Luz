import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";



const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('login success');
      localStorage.setItem('token',action.payload.token);
      return {
        ...state,
        isAuthenticated: true

      
      }
    case LOGIN_FAIL:
      console.log('login fail');
      return {
        ...state
      }
    default: return { ...state };

  }
}