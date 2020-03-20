import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import LoginAlert from './LoginAlert';

const CreateUser = props => {

  const [user, setUser] = useState(
    {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      color: ''
    }
  );

  const { firstName, lastName, id, color, email, password, password2, admin = 'false', scheduler = 'false', lecturer = 'false' } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (firstName === '' || lastName === '' || id === '' || color === '' || email === '' || password === '' || password2 === '') {
      console.log('empty fields')
    } else if (password !== password2) {
      console.log('different passwords')
    } else {
      register({
        id,
        firstName,
        lastName,
        email,
        password,
        admin,
        scheduler,
        lecturer,
        color
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Create User
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            name='firstName'
            value={firstName}
            onChange={onChange}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={onChange}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='id'>ID</label>
          <input
            type='text'
            name='id'
            value={id}
            onChange={onChange}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='color'>User Color</label>
          <input
            type='color'
            name='color'
            value={color}
            onChange={onChange}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label htmlFor='admin'>Admin</label>
          <select id="admin" name="admin" onChange={onChange}>
            <option value={false}>No</option>
            <option value={true}>Yes</option></select>
        </div>
        <div className='form-group'>
          <label htmlFor='scheduler'>Scheduler</label>
          <select id="scheduler" name="scheduler" onChange={onChange}>
            <option value={false}>No</option>
            <option value={true}>Yes</option></select>
        </div>
        <div className='form-group'>
          <label htmlFor='lecturer'>Lecturer</label>
          <select id="lecturer" name="lecturer" onChange={onChange}>
            <option value={false}>No</option>
            <option value={true}>Yes</option></select>
        </div>

        <LoginAlert />
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div >
  );
};
const mapStateToProps = state => {
  return {
    authObj: state.auth,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(CreateUser);
