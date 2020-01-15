import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import AppLogo from '../../styles/assets/logo_white.png';

const Navbar = props => {
  const onLogout = () => {
    logout();
    // clearMemos();
  };

  //   The Navbar will look diffrent if the user is Authenticated to site
  const authLinks = (
    <Fragment>
      <li> Hello {props.authObj.user && props.authObj.user.first_name}</li>
      <li>
        <Link to='/'>
          <i className='fa fa-home'></i>Home
        </Link>
      </li>
      <li>
        <Link to='/settings'>
          <i className='fas fa-user-cog'></i>User Settings
        </Link>
      </li>
      <li>
        <Link to='/about'>
          <i className='fas fa-info-circle'></i>About
        </Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'>
            <span className='hide-sm'>LogOut</span>
          </i>
        </a>
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
      <ul>{props.authObj.isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(Navbar);
