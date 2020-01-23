import store from '../store';
import loadLang from '../i18n/index';
import { LOAD_LITERALS } from './types';

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
      return;
    case 'he':
      loadLiterals(loadLang('he'), 'rtl', 'he');
      return;
    default:
      loadLiterals(loadLang('he'), 'rtl', 'he');
      return;
  }
}