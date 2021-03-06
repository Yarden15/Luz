import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './styles/App.scss';
import store from './store';
import { Provider } from 'react-redux';
import { defineLang } from "./actions/literalActions";
import { loadUser } from './actions/authActions';

let lang = navigator.language;
lang = lang.split('-');

loadUser();
defineLang(lang[0] || 'en');

ReactDOM.render(
  <Fragment>
    <HashRouter>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter >
    </HashRouter>
  </Fragment>
  , document.getElementById('root'));
