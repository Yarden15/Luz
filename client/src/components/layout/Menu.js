import React, { Fragment } from 'react';

const Menu = () => {
  // @todo - destruct isAuthenticated from the right component
  // for now its intialize by defaul to be false
  const isAuthenticated = false;

  //   @todo - create the correct list to this method
  //   The Navbar will look diffrent if the user is Authenticated to site
  const managerLinks = (
    <Fragment>
      {/* <li> Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'>
            <span className='hide-sm'>LogOut</span>
          </i>
        </a>
      </li> */}
    </Fragment>
  );

  const userLinks = (
    <Fragment>
      <li>Schedule</li>
      <li>Users</li>
      <li>Requests</li>
      <li>Personal Area</li>
    </Fragment>
  );
  return (
    // Default Navbar where we see the Icon & App name
    // also we will add an option for the organization Logo
    <nav className='menu'>
      {/* <h2></h2> */}
      <ul>{isAuthenticated ? managerLinks : userLinks}</ul>
    </nav>
  );
};

export default Menu;
