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
        <Link to='/'>
          <i className='fa fa-home'></i>Home
        </Link>
      </li>
      <li>
        <Link to='/user'>
          <i className='fas fa-user-cog'></i>User Name
        </Link>
      </li>
      <li>
        <Link to='/about'>
          <i className='fas fa-question-circle'></i>About
        </Link>
      </li>
      <li>
        <i className='fas fa-sign-out-alt'></i>
        <span className='hide-sm'>Logout</span>
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
