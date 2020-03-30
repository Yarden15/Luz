import React, { useEffect } from 'react';
import { loadUser } from '../../actions/authActions';

const About = props => {
  // Load user in this component
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>About This App</h1>
      <p className='my-1'>Here we will explain... bla bla bla</p>
      <p className='p'>
        <strong>Version: 1.0.0</strong>
      </p>
    </div>
  );
};

export default About;
