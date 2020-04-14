import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../utils/history';
import {isLecuturer} from '../../actions/userActions';

const LecturerRoute = ({ component: Component, authObj, exact, strict, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authObj.isAuthenticated && isLecuturer() ? (<Component {...props} {...history} />) :
          (<Redirect to='/accesserror' />)}
    />
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(LecturerRoute);
