import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import store from './store';
import { Provider } from 'react-redux';
import { defineLang } from "./actions/literalActions";

defineLang('he');

ReactDOM.render(
  <Fragment>
    <BrowserRouter />
    <Provider store={store}>
      <App />
    </Provider>
    <BrowserRouter />
  </Fragment>
  , document.getElementById('root'));
