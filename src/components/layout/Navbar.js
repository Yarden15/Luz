import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ logo, title }) => {
  return (
    <nav className='navbar'>
      <h1>
        <i className={logo} />
        {title}
      </h1>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'LUZ ',
  logo: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
