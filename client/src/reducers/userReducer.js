import { GET_USERS, SET_LOADING_USER, SORT_USERS, INITIAL_USER } from '../actions/types';

const initialState = {
  users: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      let newUsers = [];
      action.payload.map(event => newUsers.push(event));
      return {
        ...state,
        users: newUsers,
        loading: false
      };
    case SET_LOADING_USER:
      return {
        ...state,
        loading: true
      }
    case SORT_USERS:
      let newArray = state.users;
      newArray.sort(action.payload)
      return {
        ...state,
        users: newArray,
        loading: false
      }
    case INITIAL_USER:
      return {
        users: [],
        loading: false
      };
    default:
      return { ...state };
  }
};
