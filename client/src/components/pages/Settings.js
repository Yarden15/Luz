import React, { Fragment, useEffect } from 'react';
import { loadUser } from '../../actions/authActions';
import Menu from '../layout/Menu';
import UserInfo from '../userInfo/UserInfo';
import UserInfoMenu from '../layout/sideMenu/UserInfoMenu';

const Settings = () => {
  // Load user in this component
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Menu />
      <div className='row '>
        <div className='col-sm-3'>
          <UserInfoMenu />
        </div>
        <div className='col-sm-9'>
          <UserInfo />
        </div>
      </div>
    </Fragment>
  );
};

export default Settings;
