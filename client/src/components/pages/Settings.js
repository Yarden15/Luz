import React, { Fragment } from 'react';
import Menu from '../layout/Menu';
import UserInfo from '../userInfo/UserInfo';
import UserInfoMenu from '../layout/sideMenu/UserInfoMenu';


const Settings = () => {
  return (
    <Fragment>
      <Menu />
      <div className="row ">
        <div className='col-sm-3'>
          <UserInfoMenu />
        </div>
        <div className='col-sm-9'>
          <UserInfo />
        </div>
      </div>
    </Fragment >
  );
};

export default Settings;