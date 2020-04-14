import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import AppLogo from '../../styles/assets/logo_white.png';
import { toggleLangMenu } from '../../actions/literalActions';
import LangMenu from './LangMenu';

const Navbar = props => {
  const onLogout = () => {
    logout();
    // clearMemos();
  };
  //   The Navbar will look diffrent if the user is Authenticated to site
  const authLinks = (
    <Fragment>
      {/* <li> {props.t.hello} {props.authObj.user && props.authObj.user.first_name}</li> */}
      <li>
        <Link to='/'>
          <i className='fa fa-home'></i>{props.t.home}
        </Link>
      </li>
      <li>
        <Link to='/about'>
          <i className='fas fa-info-circle'></i>{props.t.about}
        </Link>
      </li>
      <li onClick={() => toggleLangMenu()} className="lang-btn">
        <i className='fas fa-globe'></i>{props.t.language}
      </li>
      <LangMenu class='connected'/>
      <li>
        <a onClick={onLogout} href='/'>
          <i className='fas fa-sign-out-alt'></i>{props.t.logout}
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/about'>
          <i className='fas fa-info-circle'></i>{props.t.about}
        </Link>
      </li>
      <li onClick={() => toggleLangMenu()} className="lang-btn" >
        <i className='fas fa-globe'></i>{props.t.language}
      </li>
      <LangMenu />
      <li>
        <Link to='/login'>
          <i className="fas fa-sign-in-alt"></i>{props.t.login}
        </Link>
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
    authObj: state.auth,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(Navbar);


