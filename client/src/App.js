import React, { Fragment, useEffect } from 'react';
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Settings from './components/pages/Settings';
import history from './utils/history';
import setAuthToken from './utils/setAuthToken';
import './styles/App.scss';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {

  useEffect(() => {
    document.dir = props.locale === "he" ? "rtl" : "ltr";
  }, [props.locale]);

  return (
    <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/login' component={Login} history={history} />
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/settings' component={Settings} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
    </Router>
  );
};


App.propTypes = {
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ locale: state.i18n.locale });

export default connect(mapStateToProps)(App);
