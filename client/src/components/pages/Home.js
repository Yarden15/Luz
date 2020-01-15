import React, { useContext, useEffect, Fragment } from 'react';
import Menu from '../layout/Menu';

import UserInfo from '../userInfo/UserInfo';
import UserInfoMenu from '../layout/sideMenu/UserInfoMenu';

const Home = () => {
  return (
    <Fragment>
      <Menu />
      <div className='grid-2'>
        <div>
          <UserInfo />
        </div>
        <div className='card bg-light text-right'>
          <UserInfoMenu />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
