import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

const Login = props => {
  // If there a change in the props down then we will use it
  useEffect(() => {
    // If the user has been authenticated- Redirect to home page
    if (props.authObj.isAuthenticated) {
      props.history.push('/');
    }
    // If there is an error add to the state
    if (props.authObj.error === 'Ivalid Credentials') {
      // setAlert(error, 'danger');
      // clearErrors();
      console.log('Invalid Credentials');
    }

    //eslint-disable-next-line
  }, [props.authObj.error, props.authObj.isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    organization: '',
    password: ''
  });

  const { email,organization, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || organization === '' || password === '') {
      console.log('empty fields');
    } else {
      login({
        email,
        organization,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        {' '}
        Account <span className='text primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='organization'>Organization</label>
          <input
            type='organization'
            name='organization'
            value={organization}
            onChange={onChange}
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          ></input>
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth
  };
};

export default connect(mapStateToProps)(Login);
