import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../utils/history';

const AdminRoute = ({ component: Component, authObj, exact, strict, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (authObj.isAuthenticated && authObj.user.manager) ? (<Component {...props} {...history} />) :
          (<Redirect to='/' />)}
    />
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(AdminRoute);
