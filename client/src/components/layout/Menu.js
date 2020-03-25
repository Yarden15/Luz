import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './Spinner';

const Menu = props => {
  // @todo - destruct isAuthenticated from the right component
  // for now its intialize by defaul to be false


  //   @todo - create the correct list to this method
  //   The Navbar will look diffrent if the user is Authenticated to site
  const managerLinks = (
    <Fragment>
      <li> <Link to='/createevent'>{props.t.adjusting_lecturer_for_course}</Link></li>
      <li>{props.t.manage_courses}
        <div className={`sub-menu triangle-isosceles ${props.dir}`}>
          <ul>
            <li><Link to='/createcourse'>{props.t.create_course}</Link></li>
            <li>Edit Course</li>
            <li>Delete Course</li>
          </ul>
        </div>
      </li>
      <li><Link to='/manageusers'>{props.t.manage_users}</Link>
        <div className={`sub-menu triangle-isosceles ${props.dir}`}>
          <ul>
            <li><Link to='/createuser'>{props.t.create_user}</Link></li>
            <li>Edit User</li>
            <li>Delete User</li>
          </ul>
        </div>
      </li>
    </Fragment>
  );

  const schedulerLinks = (
    <Fragment>
      <li>
        <Link to='/placement'>{props.t.scheduling_courses}</Link>
      </li>
    </Fragment>
  )

  const lecturerLinks = (
    <Fragment>
      <li> <Link to='/'>{props.t.my_schedule}</Link></li>
      <li> <Link to='/'>{props.t.submit_scheduling}</Link></li>
    </Fragment>
  );
  const userLinks = (
    <Fragment>
      <li> <Link to='/settings'>{props.t.user_settings}</Link></li>
    </Fragment>
  );

  if (props.authObj.loading) {
    return (
      <div id='menu-spinner'>
        <Spinner id='spinner-events-container' />
      </div>);

  } else {
    return (
      <div>
        <ul className='menu'>
          {props.authObj.user.scheduler && schedulerLinks}
          {props.authObj.user.manager && managerLinks}
          {props.authObj.user.lecturer && lecturerLinks}
          {userLinks}</ul>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(Menu);
