import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { isScheduler } from '../../actions/userActions';

const SchedulerRoute = ({ component: Component, authObj, exact, strict, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') && isScheduler() ? (<Component {...props} {...history} />) :
          (<Redirect to='/accesserror' />)}
    />
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(SchedulerRoute);
