import React, {Fragment } from 'react';
import SceduleContainer from '../schedule/ScheduleContainer';
import EventsContainer from '../event/eventsContainer';
import ScheduleBar from '../schedule/SchedulesBar';

const Home = () => {
  return (
    <Fragment>
      {/* <Menu /> */}
      <ScheduleBar/>
      <div className="row ">
        <div className='col-sm-3'>
          {/* <UserInfoMenu /> */}
          <EventsContainer />
        </div>
        <div className='col-sm-9'>
          {/* <UserInfo /> */}
          <SceduleContainer />
        </div>
      </div>
    </Fragment >
  );
};

export default Home;
