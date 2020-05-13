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
    getSchedules();
    getEvents();
    getCourses();
    getUsers();
    getLocations();
  }, []);

  return (
    <Fragment>
      {props.authObj.user && <div className='center-horizontaly'>{props.t.hello} {props.authObj.user.first_name} {props.authObj.user.last_name}</div>}
      <Menu />
      <MessageBoard />
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    dir: state.literals.dir,
    t: state.literals.literals
  };
};

export default connect(mapStateToProps)(Home);
