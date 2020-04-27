import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourseById, updateCourse } from '../../actions/eventsActions';
import LoginAlert from '../auth/LoginAlert';
import { updateError, displayAlert } from '../../actions/authActions';
import Menu from '../layout/Menu';
import { loadUser } from '../../actions/authActions';

const EditCourse = props => {
  // Load user in this component
  useEffect(() => {
    !props.authObj.user && loadUser()
    // eslint-disable-next-line
  }, []);

  let editCourse = getCourseById(props.match.params.id)
  const [course, setCourse] = useState(
    {
      _id: editCourse._id,
      serial_num: editCourse.serial_num,
      title: editCourse.title,
      year: editCourse.year,
      semester: editCourse.semester,
      location: editCourse.location,
      course_hours: editCourse.course_hours
    }
  );

  const { _id, title, year, serial_num, semester, location, course_hours } = course;

  const onChange = e => setCourse({ ...course, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (year === '' || semester === '' || location === '') {
      updateError('empty_fields_error');
      displayAlert();
    } else {
      updateCourse({ _id, serial_num, title, year, semester, location, course_hours });
    }
  };

  return (
    <Fragment>
      <Menu />
      <div className='form-container'>
        <h1>{props.t.edit_course}</h1>
        <form onSubmit={onSubmit}>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='serial_num'>{props.t.serial_number}</label>
            <input
              type='text'
              name='serial_num'
              value={serial_num}
              onChange={onChange}
              dir={props.dir}
              required
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='title'>{props.t.course_title}</label>
            <input
              type='text'
              name='title'
              value={title}
              onChange={onChange}
              dir={props.dir}
              required
            ></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='year'>{props.t.year}</label>
            <select id="select-year" className={props.dir} dir={props.dir} name="year"
              onChange={onChange} value={year}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={'a'}>{props.t.a}</option>
              <option className={props.dir} value={'b'}>{props.t.b}</option>
              <option className={props.dir} value={'c'}>{props.t.c}</option>
              <option className={props.dir} value={'d'}>{props.t.d}</option></select>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='semester'>{props.t.semester}</label>
            <select id="select-semester" className={props.dir} dir={props.dir} name="semester" onChange={onChange} value={semester}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={'a'}>{props.t.a}</option>
              <option className={props.dir} value={'b'}>{props.t.b}</option>
              <option className={props.dir} value={'yearly'}>{props.t.yearly}</option>
              <option className={props.dir} value={'summer'}>{props.t.summer}</option></select>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='course_hours'>{props.t.course_hours}</label>
            <input
              type='time'
              name='course_hours'
              value={course_hours}
              onChange={onChange}
              required
              dir={props.dir}></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='location'>{props.t.location}</label>
            <select id="select-location" className={props.dir} dir={props.dir} name="location" onChange={onChange} value={location}>
              <option className={props.dir} defaultValue></option>
              <option className={props.dir} value={'הנביאים'}>נביאים</option>
              <option className={props.dir} value={'הקמפוס החרדי'}>הקמפוס החרדי</option>
              <option className={props.dir} value={'מקוון'}>מקוון</option></select>
          </div>
          <LoginAlert />
          <input
            type='submit'
            value={props.t.update_course}
            className='btn btn-primary btn-block' />
        </form>
      </div>
    </Fragment >
  );
};
const mapStateToProps = state => {
  return {
    authObj: state.auth,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(EditCourse);
