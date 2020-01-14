import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const PrivateRoute = ({ authObj, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !authObj.isAuthenticated ? (
          <Redirect to='/login' />
        ) : (
        
            <Component {...props} />
          )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};


export default connect(mapStateToProps)(PrivateRoute);
