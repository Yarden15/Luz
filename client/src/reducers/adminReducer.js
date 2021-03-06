import { GET_LOCATIONS, SET_LOADING_LOCATION, INITIAL_ADMIN } from '../actions/types';

const initialState = {
  locations: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      let newlocations = [];
      action.payload.map(location => newlocations.push(location));
      return {
        ...state,
        locations: newlocations,
        loading: false
      };
    case SET_LOADING_LOCATION:
      return {
        ...state,
        loading: true
      }
    case INITIAL_ADMIN:
      return {
        locations: [],
        loading: false
      }
    default:
      return { ...state };
  }
};
