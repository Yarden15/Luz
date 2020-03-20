import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Menu = props => {
  // @todo - destruct isAuthenticated from the right component
  // for now its intialize by defaul to be false
  const admin = true;
  const manager = true;


  //   @todo - create the correct list to this method
  //   The Navbar will look diffrent if the user is Authenticated to site
  const AdminLinks = (
    <Fragment>
      <li> <Link to='/createuser'>{props.t.create_user}</Link></li>
      <li> <Link to='/'>{props.t.create_course}</Link></li>
    </Fragment>
  );

  const managerLinks = (
    <Fragment>
      <li> <Link to='/placement'>שיבוץ קורסים</Link></li>
    </Fragment>
  )

  const userLinks = (
    <Fragment>
      <li> <Link to='/'>{props.t.my_schedule}</Link></li>
      <li> <Link to='/'>הגשת שיבוץ</Link></li>
      <li> <Link to='/settings'>{props.t.user_settings}</Link></li>
    </Fragment>
  );


  return (
    <div>
      <ul className='menu'>{manager && managerLinks}{admin && AdminLinks}{userLinks}</ul>
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

export default connect(mapStateToProps)(Menu);
