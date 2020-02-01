import { CLOSE_POPUP, POPUP_ALERT } from '../actions/types';

const initialState = {
  title: "",
  msg: "",
  type: "",
  display: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPUP_ALERT:
      return {
        ...state,
        title: action.payload.title,
        msg: action.payload.msg,
        type: action.payload.type,
        display: true
      };
    case CLOSE_POPUP:
      return {
        ...state,
        display: false
      };
    default:
      return { ...state };
  }
}