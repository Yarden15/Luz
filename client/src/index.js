import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';

ReactDOM.render(
  <Fragment>
    <BrowserRouter />
    <App />
    <BrowserRouter />
  </Fragment>
, document.getElementById('root'));
