import React, { useContext, useEffect, Fragment } from 'react';
import Menu from '../layout/Menu';

import UserInfo from '../userInfo/UserInfo';
import UserInfoMenu from '../layout/sideMenu/UserInfoMenu';
import SceduleContainer from '../schedule/ScheduleContainer'

const Home = () => {
  return (
    <Fragment>
      <Menu />
      <div className="row text-left">
        <div className='card col-sm-2'>
          <UserInfoMenu />
        </div>
        <div className='col-sm-10'>
          <UserInfo />
        </div>
      </div>
    </Fragment >
  );
};

export default Home;
