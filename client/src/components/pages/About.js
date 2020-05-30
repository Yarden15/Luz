import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

const About = props => {
  // Load user in this component
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='center-horizontaly'>
      <h1 className='center-horizontaly'>{props.t.about}</h1><br />
      <div className={props.dir}>{props.t.about_p1}</div><br />
      <div className={props.dir}>{props.t.about_p20}</div>
      <div className={props.dir}>{props.t.about_admin}</div>
      <div className={props.dir}>{props.t.about_scheduler1}</div>
      <div className={props.dir}>{props.t.about_scheduler2}</div>
      <div className={props.dir}>{props.t.about_lecturer}</div><br />
      <div className={props.dir}>{props.t.about_p21}</div>
      <div className={props.dir}>{props.t.about_p22}</div>
      <div className={props.dir}>{props.t.about_p23}</div>
      <ul className={props.dir}>
        <li><a href='https://fullcalendar.io/'>FullCalendar</a></li>
        <li><a href='https://sweetalert2.github.io/'>SweetAlert2</a></li>
      </ul><br />
      <div className={props.dir}>{props.t.about_p3}</div><br />
      <div className={props.dir}>{props.t.contact_us}</div>
      <ul className={props.dir}>
        <li>Yarden Narkissi - <a href='mailto:Yarden15@gmail.com'>Yarden15@gmail.com</a></li>
        <li>Yarin Alon - <a href='mailto:Yarinalonc@gmail.com'>Yarinalonc@gmail.com</a></li>
        <li>Gil Avraham - <a href='mailto:Gilav21@gmail.com'>Gilav21@gmail.com</a></li>
      </ul><br />
      <p className='center-horizontaly'><strong>Version: 1.0.155</strong></p>
    </div >
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    dir: state.literals.dir,
    t: state.literals.literals
  };
};

export default connect(mapStateToProps)(About);

