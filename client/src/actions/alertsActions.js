import { CLOSE_POPUP, POPUP_ALERT } from './types';
import store from '../store';

export const closePopup = () => {
  store.dispatch({
    type: CLOSE_POPUP
  });
}

export const popupAlert = (title, msg, type, timeout = 10000) => {
  store.dispatch({
    type: POPUP_ALERT,
    payload: {
      title,
      msg,
      type
    }
  })

  setTimeout(closePopup, timeout);
}
