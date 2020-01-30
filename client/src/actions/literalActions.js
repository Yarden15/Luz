import store from '../store';
import loadLang from '../i18n/index';
import { LOAD_LITERALS, DISPLAY_LANG_MENU } from './types';
import { changeLangScheds } from './scheduleActions';

export const loadLiterals = (literals, dir, lang) => {
  store.dispatch({
    type: LOAD_LITERALS,
    payload: { literals, dir, lang }
  })
};

export const defineLang = (lang) => {
  switch (lang) {
    case 'en':
      loadLiterals(loadLang('en'), 'ltr', 'en');
      break;
    case 'he':
      loadLiterals(loadLang('he'), 'rtl', 'he');
      break;
    default:
      loadLiterals(loadLang('he'), 'rtl', 'he');
      break;
  }
  changeLangScheds();

}

export const displayMenu = () => {
  store.dispatch({
    type: DISPLAY_LANG_MENU
  });
}