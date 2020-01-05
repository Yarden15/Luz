import React, { useContext, useEffect, Fragment } from 'react';
import Menu from '../layout/Menu';
import UserInfo from '../userInfo/UserInfo';
import UserInfoMenu from '../layout/sideMenu/UserInfoMenu';
import SceduleContainer from '../schedule/ScheduleContainer';
import EventsContainer from '../event/eventsContainer';

const Home = () => {
  return (
    <Fragment>
      <Menu />
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
