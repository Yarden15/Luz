import { LOAD_LITERALS } from '../actions/types'

const initialState = {
  literals: {},
  dir: null,
  lang: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LITERALS:
      return {
        ...state,
        literals: action.payload.literals,
        dir: action.payload.dir,
        lang: action.payload.lang,
      };
    default:
      return state;
  }
};


