import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { createCourse } from '../../actions/eventsActions';
import { updateError, displayAlert } from '../../actions/authActions';
import LoginAlert from '../auth/LoginAlert';

const CreateCourse = (props) => {

  const [course, setCourse] = useState(
    {
      serial_num: '',
      title: '',
      year: 'a',
      semester: 'a',
      location: '',
      course_hours: 0
    }
  );

  const { title, year, serial_num, semester, location, course_hours } = course;

  const onChange = e => setCourse({ ...course, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (year === '' || semester === '' || location === '') {
      updateError('empty_fields_error');
      displayAlert();
    } else {
      createCourse({ serial_num, title, year, semester, location, course_hours });
      setCourse({ serial_num: '', title: '', year: '', semester: '', location: '', course_hours: 0 });
      document.getElementById('select-semester').selectedIndex = -1;
      document.getElementById('select-year').selectedIndex = -1;
      document.getElementById('select-location').selectedIndex = -1;
    }
  };

  return (
    <Fragment>
      <Menu />
      <div className='form-container'>
        <h1>{props.t.create_course}</h1>
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
            <select id="select-year" className={props.dir} dir={props.dir} name="year" onChange={onChange}>
              <option className={props.dir} disabled selected value></option>
              <option className={props.dir} value={'a'}>{props.t.a}</option>
              <option className={props.dir} value={'b'}>{props.t.b}</option>
              <option className={props.dir} value={'c'}>{props.t.c}</option>
              <option className={props.dir} value={'d'}>{props.t.d}</option></select>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='semester'>{props.t.semester}</label>
            <select id="select-semester" className={props.dir} dir={props.dir} name="semester" onChange={onChange}>
              <option className={props.dir} disabled selected value></option>
              <option className={props.dir} value={'a'}>{props.t.a}</option>
              <option className={props.dir} value={'b'}>{props.t.b}</option>
              <option className={props.dir} value={'yearly'}>{props.t.yearly}</option>
              <option className={props.dir} value={'summer'}>{props.t.summer}</option></select>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='course_hours'>{props.t.course_hours}</label>
            <input
              type='number'
              name='course_hours'
              value={course_hours}
              onChange={onChange}
              required
              min="0" max="99"
              dir={props.dir}></input>
          </div>
          <div className={`form-group ${props.dir}`}>
            <label htmlFor='location'>{props.t.location}</label>
            <select id="select-location" className={props.dir} dir={props.dir} name="location" onChange={onChange}>
              <option className={props.dir} disabled selected value></option>
              <option className={props.dir} value={'נביאים'}>נביאים</option>
              <option className={props.dir} value={'הקמפוס החרדי'}>הקמפוס החרדי</option>
              <option className={props.dir} value={'מקוון'}>מקוון</option></select>
          </div>
          <LoginAlert />
          <input
            type='submit'
            value={props.t.create_course}
            className='btn btn-primary btn-block' />
        </form>
      </div>
    </Fragment >
  );
};

const mapStateToProps = state => {
  return {
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(CreateCourse);