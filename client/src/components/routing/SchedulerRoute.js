import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../utils/history';


const SchedulerRoute = ({ component: Component, authObj, exact, strict, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (authObj.isAuthenticated && authObj.user.scheduler) ? (<Component {...props} {...history} />) :
          (<Redirect to='/' />)}
    />
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(SchedulerRoute);
