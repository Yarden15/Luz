import { GET_EVENTS, SET_LOADING, EVENT_ERROR, CREATE_DRAGGABLE } from '../actions/types';
import { Draggable } from '@fullcalendar/interaction';

const initialState = {
  events: [
    { title: "אלגוריתמים - ערן לונדון", id: "1" },
    { title: "תכנות אינטרנט - סולנג' קרסנטי", id: "2" },
    { title: "מערכות הפעלה - יורם ביברמן", id: "3" },
    { title: "מסדני נתונים - שמחה רוזן", id: "4" },
    { title: "פרוייקט גמר - יורם יקותיאלי", id: "5" },
    { title: "אלגוריתמים - ערן לונדון", id: "6" },
    { title: "תכנות אינטרנט - סולנג' קרסנטי", id: "7" },
    { title: "מערכות הפעלה - יורם ביברמן", id: "8" },
    { title: "מסדני נתונים - שמחה רוזן", id: "9" },
    { title: "פרוייקט גמר - יורם יקותיאלי", id: "10" }
  ],
  current: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DRAGGABLE:

      return state;
    
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case EVENT_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}