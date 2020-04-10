import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserById, updateUser } from '../../actions/userActions';
import LoginAlert from '../auth/LoginAlert';
import { updateError, displayAlert } from '../../actions/authActions';
import Menu from '../layout/Menu';

const EditUser = props => {
  let editUser = getUserById(props.match.params.id)
  const [user, setUser] = useState(
    {
      _id: editUser._id,
      id_number: editUser.id_number,
      first_name: editUser.first_name,
      last_name: editUser.last_name,
      email: editUser.email,
      color: editUser.color,
      manager: editUser.manager,
      scheduler: editUser.scheduler,
      lecturer: editUser.lecturer
    }
  );

  const { _id, first_name, last_name, id_number, color, email, manager, scheduler, lecturer } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });;

  const onSubmit = e => {
    e.preventDefault();
    if (color === '') {
      updateError('please_select_a_user_color');
      displayAlert();
    } else if (manager === '' || scheduler === '' || lecturer === '') {
      updateError('empty_fields_error');
      displayAlert();
    } else {
      updateUser({
        _id, id_number, first_name, last_name, email, manager, scheduler, lecturer, color
      });
    }
  };

  return (
    <Fragment>
      <Menu />
      <div className='form-container'>
        <h1>{props.t.edit_user}</h1>
        <form onSubmit={onSubmit}>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='email'>{props.t.email_address}</label>
            <input
              type='email'
              name='email'
              value={email}
              readOnly="readOnly"
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
            <select id="select-manager" className={props.dir} dir={props.dir} name="manager" onChange={onChange}
              value={manager}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={false}>{props.t.no}</option>
              <option className={props.dir} value={true}>{props.t.yes}</option></select>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='scheduler'>{props.t.scheduler}</label>
            <select id="select-scheduler" className={props.dir} dir={props.dir} name="scheduler" onChange={onChange} value={scheduler}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={false}>{props.t.no}</option>
              <option className={props.dir} value={true}>{props.t.yes}</option></select>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='lecturer'>{props.t.lecturer}</label>
            <select id="select-lecturer" className={props.dir} dir={props.dir} name="lecturer" onChange={onChange} value={lecturer}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={false}>{props.t.no}</option>
              <option className={props.dir} value={true}>{props.t.yes}</option></select>
          </div>
          <LoginAlert />
          <input
            type='submit'
            value={props.t.update_user}
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

export default connect(mapStateToProps)(EditUser);
