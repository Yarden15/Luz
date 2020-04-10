import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { updateUser, changePasswordAlert } from '../../actions/userActions';


const UserSettings = (props) => {
  let editUser = props.authObj.user;
  const [user, setUser] = useState(
    {
      _id: editUser._id,
      id_number: editUser.id_number,
      first_name: editUser.first_name,
      last_name: editUser.last_name,
      email: editUser.email
    }
  );

  const { _id, first_name, last_name, id_number, email } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });;

  const onSubmit = e => {
    e.preventDefault();
    // updateUser({
    //   _id, id_number, first_name, last_name, email
    // });
    console.log("update user");
  };

  return (
    <Fragment>
      <Menu />
      <div className='form-container'>
        <h1>{props.t.user_details}</h1>
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
            <label htmlFor='id_number'>{props.t.id}</label>
            <input
              type='text'
              name='id_number'
              value={id_number}
              onChange={onChange}
              readOnly="readOnly"
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
          <input
            type='submit'
            value={props.t.update_details}
            className='btn btn-primary btn-block medium-btn center-horizontaly' />
        </form>
        <button
          id="btn-tables"
          className='btn btn-primary btn-block center-horizontaly btn-nfm'
          onClick={() => { changePasswordAlert(_id); }}
        >{props.t.change_password}</button>
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

export default connect(mapStateToProps)(UserSettings);
