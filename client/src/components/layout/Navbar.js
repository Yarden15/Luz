import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppLogo from '../../styles/assets/logo_white.png';

const Navbar = () => {
  // @todo - destruct isAuthenticated from the right component
  // for now its intialize by defaul to be false
  const isAuthenticated = true;

  //   @todo - create the correct list to this method
  //   The Navbar will look diffrent if the user is Authenticated to site
  const authLinks = (
    <Fragment>
      <li>
        <Link to='/about'>שם המשתמש</Link>
      </li>
      <li>
        <Link to='/user'>עדכון פרטים</Link>
      </li>
      <li>
        <i className='fas fa-sign-out-alt'>
          <span className='hide-sm'>התנתק</span>
        </i>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    // Default Navbar where we see the Icon & App name
    // also we will add an option for the organization Logo
    <nav className='navbar'>
      <h1>
        <img src={AppLogo} alt='logo' className='logo-small' />
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;