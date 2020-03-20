import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import About from './components/pages/About';
import CoursePlacementPage from './components/pages/CoursePlacementPage';
import CreateUser from './components/auth/CreateUser';
import Settings from './components/pages/Settings';
import history from './utils/history';
import setAuthToken from './utils/setAuthToken';
import './styles/App.scss';
import PopupMessage from './components/alerts/PopupMessage';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <PopupMessage />
        <div className='container'>
          <Switch>
            <Route exact path='/login' component={Login} history={history} />
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/settings' component={Settings} />
            <PrivateRoute exact path='/placement' component={CoursePlacementPage} />
            <Route exact path='/createuser' component={CreateUser} />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default connect()(App);
