import React, { Fragment, useEffect } from 'react';
import SceduleContainer from '../schedule/ScheduleContainer';
import EventsContainer from '../event/eventsContainer';
import ScheduleBar from '../schedule/SchedulesBar';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

const Home = () => {
  // Load user in this component
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {/* <Menu /> */}
      <ScheduleBar />
      <div className='row '>
        <div className='col-sm-3'>
          {/* <UserInfoMenu /> */}
          <EventsContainer />
        </div>
        <div className='col-sm-9'>
          {/* <UserInfo /> */}
          <SceduleContainer />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(Home);
