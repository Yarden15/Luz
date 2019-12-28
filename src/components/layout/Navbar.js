import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../styles/assets/logo_white.png'

const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar'>
      <h1>
        <img src={logo} alt='logo' className='logo-small' />
      </h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'LUZ ',
  icon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
