import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import Menu from '../layout/Menu';
import MessageBoard from '../layout/MessageBoard';

const Home = props => {
  // Load user in this component
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Menu />
      <MessageBoard />
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(Home);
