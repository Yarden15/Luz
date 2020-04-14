import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../utils/history';

const PrivateRoute = ({ component: Component, authObj, exact, strict, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (<Component {...props} {...history} />) :
          (<Redirect to='/login' />)}
    />
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(PrivateRoute);
