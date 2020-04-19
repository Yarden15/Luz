import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import Menu from '../layout/Menu';
import MessageBoard from '../layout/MessageBoard';
import { getEvents, getCourses } from '../../actions/eventsActions';
import { getUsers } from '../../actions/userActions';
import { getLocations } from '../../actions/adminActions';
import { getSchedules } from '../../actions/scheduleActions';

const Home = props => {
  // Load user in this component
  useEffect(() => {
    loadUser();
    //load all data from the db
    getEvents();
    getCourses();
    getUsers();
    getLocations();
    getSchedules();
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
