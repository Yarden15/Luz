import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Settings from './components/pages/Settings';
import store from './store'
import { Provider } from 'react-redux';


import './styles/App.scss';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/settings' component={Settings} />
              <PrivateRoute exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Provider>
    </Router>
  );
};

export default App;
