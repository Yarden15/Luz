import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import LoginAlert from '../auth/LoginAlert';
import { updateError, displayAlert } from '../../actions/authActions';
import { getRandomColor } from '../../actions/userActions';
import Menu from '../layout/Menu';

const CreateUser = props => {

  const [user, setUser] = useState(
    {
      id_number: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password2: '',
      color: getRandomColor(),
      manager: '',
      scheduler: '',
      lecturer: ''
    }
  );

  const { first_name, last_name, id_number, color, email, password, password2, manager, scheduler, lecturer } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (color === '') {
      updateError('please_select_a_user_color');
      displayAlert();
    } else if (manager === '' || scheduler === '' || lecturer === '') {
      updateError('empty_fields_error');
      displayAlert();
    } else if (password !== password2) {
      updateError('Non_identical_passwords');
      displayAlert();
    } else {
      register({
        id_number, first_name, last_name, email, password, manager, scheduler, lecturer, color
      })
      setUser({
        id_number: '', first_name: '', last_name: '', email: '', password: '', password2: '', color: '', manager: '', scheduler: '', lecturer: ''
      })
      document.getElementById('select-manager').selectedIndex = -1;
      document.getElementById('select-scheduler').selectedIndex = -1;
      document.getElementById('select-lecturer').selectedIndex = -1;
    }
  };

  return (
    <Fragment>
      <Menu />
      <div className='form-container'>
        <h1>{props.t.create_user}</h1>
        <form onSubmit={onSubmit}>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='email'>{props.t.email_address}</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              dir={props.dir}
              required
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='name'>{props.t.first_name}</label>
            <input
              type='text'
              name='first_name'
              value={first_name}
              onChange={onChange}
              dir={props.dir}
              required
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='name'>{props.t.last_name}</label>
            <input
              type='text'
              name='last_name'
              value={last_name}
              onChange={onChange}
              dir={props.dir}
              required
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='password'>{props.t.password}</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              dir={props.dir}
              required
              minLength='6'
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='password2'>{props.t.confirm_password}</label>
            <input
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              dir={props.dir}
              required
              minLength='6'
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='id_number'>{props.t.id}</label>
            <input
              type='text'
              name='id_number'
              value={id_number}
              onChange={onChange}
              dir={props.dir}
              required
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='color'>{props.t.user_color}</label>
            <input
              type='color'
              name='color'
              value={color}
              onChange={onChange}
              dir={props.dir}
              required
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='manager'>{props.t.manager}</label>
            <select id="select-manager" className={props.dir} dir={props.dir} name="manager" onChange={onChange}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={false}>{props.t.no}</option>
              <option className={props.dir} value={true}>{props.t.yes}</option></select>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='scheduler'>{props.t.scheduler}</label>
            <select id="select-scheduler" className={props.dir} dir={props.dir} name="scheduler" onChange={onChange}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={false}>{props.t.no}</option>
              <option className={props.dir} value={true}>{props.t.yes}</option></select>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='lecturer'>{props.t.lecturer}</label>
            <select id="select-lecturer" className={props.dir} dir={props.dir} name="lecturer" onChange={onChange}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={false}>{props.t.no}</option>
              <option className={props.dir} value={true}>{props.t.yes}</option></select>
          </div>
          <LoginAlert />
          <input
            type='submit'
            value={props.t.create_user}
            className='btn btn-primary btn-block'
          />
        </form>
      </div >
    </Fragment>
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
