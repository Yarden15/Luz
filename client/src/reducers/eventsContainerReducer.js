import {
  GET_EVENTS,
  SET_LOADING,
  EVENT_ERROR,
  CREATE_DRAGGABLE
} from '../actions/types';

const initialState = {
  events: [
    { title: 'אלגוריתמים - ערן לונדון', id: '12263315' },
    { title: "תכנות אינטרנט - סולנג' קרסנטי", id: '12244878' },
    { title: 'מערכות הפעלה - יורם ביברמן', id: '12254432' },
    { title: 'מסדני נתונים - שמחה רוזן', id: '12284121' },
    { title: 'פרוייקט גמר - יורם יקותיאלי', id: '11232551' },
    { title: 'אלגוריתמים - ערן לונדון', id: '12263316' },
    { title: "תכנות אינטרנט - סולנג' קרסנטי", id: '12244879' },
    { title: 'מערכות הפעלה - יורם ביברמן', id: '12254433' },
    { title: 'מסדני נתונים - שמחה רוזן', id: '122841211' },
    { title: 'פרוייקט גמר - יורם יקותיאלי', id: '11232552' }
  ],
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DRAGGABLE:
      return state;

    case GET_EVENTS:
      return {
        ...state,
        events: [...state,action.payload]
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
};
