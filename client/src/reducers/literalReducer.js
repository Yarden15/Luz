import { LOAD_LITERALS,OPEN_LANG_MENU, CLOSE_LANG_MENU } from '../actions/types'

const initialState = {
  literals: {},
  dir: null,
  lang: null,
  displayMenu: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LITERALS:
      return {
        ...state,
        literals: action.payload.literals,
        dir: action.payload.dir,
        lang: action.payload.lang,
        displayMenu: false
      };
      case OPEN_LANG_MENU: 
      return{
        ...state,
        displayMenu: true
      }
      case CLOSE_LANG_MENU: 
      return{
        ...state,
        displayMenu: false
      }
    default:
      return state;
  }
};


