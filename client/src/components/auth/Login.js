import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

const Login = (props) => {
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

  const { email, organization, password } = user;

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
        {props.t.account_login}
      </h1>
      <form onSubmit={onSubmit}>
        <div className={`form-group ${props.dir}`}>
          <label htmlFor='email'>{props.t.email_address}</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
          ></input>
        </div>
        <div className={`form-group ${props.dir}`}>
          <label htmlFor='organization'>{props.t.organization}</label>
          <input
            type='organization'
            name='organization'
            value={organization}
            onChange={onChange}
          ></input>
        </div>
        <div className={`form-group ${props.dir}`}>
          <label htmlFor='password'>{props.t.password}</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          ></input>
        </div>
        <input
          type='submit'
          value={props.t.login_button}
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(Login);
