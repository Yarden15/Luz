import store from '../store';
import loadLang from '../i18n/index';
import { LOAD_LITERALS } from './types';
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
  console.log('before changeLangScheds')
  changeLangScheds();

}