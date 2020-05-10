import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { loadUser } from '../../actions/authActions';
import { add_constraints } from '../../actions/userActions';

const SubmitSchedule = props => {
  // Load user in this component
  useEffect(() => {
    !props.authObj.user && loadUser();
  });

  let userSchedule = props.authObj.user.constraints;

  //initial state - take the info from semester A
  const [schedule, setSchedule] = useState(
    {
      semester: 'semesterA',
      constraints: {
        'semesterA': {
          sunday_start: userSchedule.semesterA.sunday_start,
          sunday_end: userSchedule.semesterA.sunday_end,
          sunday_notes: userSchedule.semesterA.sunday_notes,
          monday_start: userSchedule.semesterA.monday_start,
          monday_end: userSchedule.semesterA.monday_end,
          monday_notes: userSchedule.semesterA.monday_notes,
          tuesday_start: userSchedule.semesterA.tuesday_start,
          tuesday_end: userSchedule.semesterA.tuesday_end,
          tuesday_notes: userSchedule.semesterA.tuesday_notes,
          wednesday_start: userSchedule.semesterA.wednesday_start,
          wednesday_end: userSchedule.semesterA.wednesday_end,
          wednesday_notes: userSchedule.semesterA.wednesday_notes,
          thursday_start: userSchedule.semesterA.thursday_start,
          thursday_end: userSchedule.semesterA.thursday_end,
          thursday_notes: userSchedule.semesterA.thursday_notes,
          friday_start: userSchedule.semesterA.friday_start,
          friday_end: userSchedule.semesterA.friday_end,
          friday_notes: userSchedule.semesterA.friday_notes,
          course_comments: userSchedule.semesterA.course_comments,
          general_comments: userSchedule.semesterA.general_comments,
          critical_comments: userSchedule.semesterA.critical_comments
        },
        'semesterB': {
          sunday_start: userSchedule.semesterB.sunday_start,
          sunday_end: userSchedule.semesterB.sunday_end,
          sunday_notes: userSchedule.semesterB.sunday_notes,
          monday_start: userSchedule.semesterB.monday_start,
          monday_end: userSchedule.semesterB.monday_end,
          monday_notes: userSchedule.semesterB.monday_notes,
          tuesday_start: userSchedule.semesterB.tuesday_start,
          tuesday_end: userSchedule.semesterB.tuesday_end,
          tuesday_notes: userSchedule.semesterB.tuesday_notes,
          wednesday_start: userSchedule.semesterB.wednesday_start,
          wednesday_end: userSchedule.semesterB.wednesday_end,
          wednesday_notes: userSchedule.semesterB.wednesday_notes,
          thursday_start: userSchedule.semesterB.thursday_start,
          thursday_end: userSchedule.semesterB.thursday_end,
          thursday_notes: userSchedule.semesterB.thursday_notes,
          friday_start: userSchedule.semesterB.friday_start,
          friday_end: userSchedule.semesterB.friday_end,
          friday_notes: userSchedule.semesterB.friday_notes,
          course_comments: userSchedule.semesterB.course_comments,
          general_comments: userSchedule.semesterB.general_comments,
          critical_comments: userSchedule.semesterB.critical_comments
        },
        'semesterC': {
          sunday_start: userSchedule.semesterC.sunday_start,
          sunday_end: userSchedule.semesterC.sunday_end,
          sunday_notes: userSchedule.semesterC.sunday_notes,
          monday_start: userSchedule.semesterC.monday_start,
          monday_end: userSchedule.semesterC.monday_end,
          monday_notes: userSchedule.semesterC.monday_notes,
          tuesday_start: userSchedule.semesterC.tuesday_start,
          tuesday_end: userSchedule.semesterC.tuesday_end,
          tuesday_notes: userSchedule.semesterC.tuesday_notes,
          wednesday_start: userSchedule.semesterC.wednesday_start,
          wednesday_end: userSchedule.semesterC.wednesday_end,
          wednesday_notes: userSchedule.semesterC.wednesday_notes,
          thursday_start: userSchedule.semesterC.thursday_start,
          thursday_end: userSchedule.semesterC.thursday_end,
          thursday_notes: userSchedule.semesterC.thursday_notes,
          friday_start: userSchedule.semesterC.friday_start,
          friday_end: userSchedule.semesterC.friday_end,
          friday_notes: userSchedule.semesterC.friday_notes,
          course_comments: userSchedule.semesterC.course_comments,
          general_comments: userSchedule.semesterC.general_comments,
          critical_comments: userSchedule.semesterC.critical_comments
        },
      }
    }

  );

  const {
    semester = 'semesterA',
    constraints = {
      'semesterA': {
        sunday_start: userSchedule.semesterA.sunday_start,
        sunday_end: userSchedule.semesterA.sunday_end,
        sunday_notes: userSchedule.semesterA.sunday_notes,
        monday_start: userSchedule.semesterA.monday_start,
        monday_end: userSchedule.semesterA.monday_end,
        monday_notes: userSchedule.semesterA.monday_notes,
        tuesday_start: userSchedule.semesterA.tuesday_start,
        tuesday_end: userSchedule.semesterA.tuesday_end,
        tuesday_notes: userSchedule.semesterA.tuesday_notes,
        wednesday_start: userSchedule.semesterA.wednesday_start,
        wednesday_end: userSchedule.semesterA.wednesday_end,
        wednesday_notes: userSchedule.semesterA.wednesday_notes,
        thursday_start: userSchedule.semesterA.thursday_start,
        thursday_end: userSchedule.semesterA.thursday_end,
        thursday_notes: userSchedule.semesterA.thursday_notes,
        friday_start: userSchedule.semesterA.friday_start,
        friday_end: userSchedule.semesterA.friday_end,
        friday_notes: userSchedule.semesterA.friday_notes,
        course_comments: userSchedule.semesterA.course_comments,
        general_comments: userSchedule.semesterA.general_comments,
        critical_comments: userSchedule.semesterA.critical_comments
      },
      'semesterB': {
        sunday_start: userSchedule.semesterB.sunday_start,
        sunday_end: userSchedule.semesterB.sunday_end,
        sunday_notes: userSchedule.semesterB.sunday_notes,
        monday_start: userSchedule.semesterB.monday_start,
        monday_end: userSchedule.semesterB.monday_end,
        monday_notes: userSchedule.semesterB.monday_notes,
        tuesday_start: userSchedule.semesterB.tuesday_start,
        tuesday_end: userSchedule.semesterB.tuesday_end,
        tuesday_notes: userSchedule.semesterB.tuesday_notes,
        wednesday_start: userSchedule.semesterB.wednesday_start,
        wednesday_end: userSchedule.semesterB.wednesday_end,
        wednesday_notes: userSchedule.semesterB.wednesday_notes,
        thursday_start: userSchedule.semesterB.thursday_start,
        thursday_end: userSchedule.semesterB.thursday_end,
        thursday_notes: userSchedule.semesterB.thursday_notes,
        friday_start: userSchedule.semesterB.friday_start,
        friday_end: userSchedule.semesterB.friday_end,
        friday_notes: userSchedule.semesterB.friday_notes,
        course_comments: userSchedule.semesterB.course_comments,
        general_comments: userSchedule.semesterB.general_comments,
        critical_comments: userSchedule.semesterB.critical_comments
      },
      'semesterC': {
        sunday_start: userSchedule.semesterC.sunday_start,
        sunday_end: userSchedule.semesterC.sunday_end,
        sunday_notes: userSchedule.semesterC.sunday_notes,
        monday_start: userSchedule.semesterC.monday_start,
        monday_end: userSchedule.semesterC.monday_end,
        monday_notes: userSchedule.semesterC.monday_notes,
        tuesday_start: userSchedule.semesterC.tuesday_start,
        tuesday_end: userSchedule.semesterC.tuesday_end,
        tuesday_notes: userSchedule.semesterC.tuesday_notes,
        wednesday_start: userSchedule.semesterC.wednesday_start,
        wednesday_end: userSchedule.semesterC.wednesday_end,
        wednesday_notes: userSchedule.semesterC.wednesday_notes,
        thursday_start: userSchedule.semesterC.thursday_start,
        thursday_end: userSchedule.semesterC.thursday_end,
        thursday_notes: userSchedule.semesterC.thursday_notes,
        friday_start: userSchedule.semesterC.friday_start,
        friday_end: userSchedule.semesterC.friday_end,
        friday_notes: userSchedule.semesterC.friday_notes,
        course_comments: userSchedule.semesterC.course_comments,
        general_comments: userSchedule.semesterC.general_comments,
        critical_comments: userSchedule.semesterC.critical_comments
      },
    }
  } = schedule;

  const onChange = e => {
    let temp = constraints;
    temp[semester][e.target.name] = e.target.value
    setSchedule({ ...schedule, constraints: temp });
  }

  const onSubmit = e => {
    e.preventDefault();
    add_constraints(schedule.constraints);
  }

  return (
    <Fragment>
      <Menu />
      <div className='form-container submit-schedule'>
        <h1>{props.t.submit_schedule}</h1>

        <div className={`form-group ${props.dir}`}>
          <label htmlFor='semester'>{props.t.semester}</label>
          <select id="select-semester" className={props.dir} dir={props.dir} name="semester"
            onChange={(e) => { setSchedule({ ...schedule, [e.target.name]: e.target.value }) }} value={schedule.semester}>
            <option className={props.dir} value={'semesterA'}>{props.t.a}</option>
            <option className={props.dir} value={'semesterB'}>{props.t.b}</option>
            <option className={props.dir} value={'semesterC'}>{props.t.summer}</option></select>
        </div>

        {props.dir === 'ltr' ?
          <form onSubmit={onSubmit} id='sumbit-schedule-form'>
            <table className={`sumbit-schedule-table ${props.dir}`}>
              <thead>
                <tr className="text-center">
                  <th>{props.t.day}</th>
                  <th>{props.t.start}</th>
                  <th>{props.t.end}</th>
                  <th>{props.t.notes}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><label htmlFor='sunday'>{props.t.sunday}</label></td>
                  <td><input type="time" name="sunday_start" onChange={onChange} value={constraints[semester].sunday_start} /></td>
                  <td><input type="time" name="sunday_end" onChange={onChange} value={constraints[semester].sunday_end} /></td>
                  <td><input type="text" name="sunday_notes" className="notes" onChange={onChange} value={constraints[semester].sunday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td> <label htmlFor='monday'>{props.t.monday}</label></td>
                  <td><input type="time" name="monday_start" onChange={onChange} value={constraints[semester].monday_start} /></td>
                  <td> <input type="time" name="monday_end" onChange={onChange} value={constraints[semester].monday_end} /></td>
                  <td><input type="text" name="monday_notes" className="notes" onChange={onChange} value={constraints[semester].monday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='tuesday'>{props.t.tuesday}</label></td>
                  <td><input type="time" name="tuesday_start" onChange={onChange} value={constraints[semester].tuesday_start} /></td>
                  <td><input type="time" name="tuesday_end" onChange={onChange} value={constraints[semester].tuesday_end} /></td>
                  <td><input type="text" name="tuesday_notes" className="notes" onChange={onChange} value={constraints[semester].tuesday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='wednesday'>{props.t.wednesday}</label></td>
                  <td> <input type="time" name="wednesday_start" onChange={onChange} value={constraints[semester].wednesday_start} /></td>
                  <td><input type="time" name="wednesday_end" onChange={onChange} value={constraints[semester].wednesday_end} /></td>
                  <td><input type="text" name="wednesday_notes" className="notes" onChange={onChange} value={constraints[semester].wednesday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='thursday'>{props.t.thursday}</label></td>
                  <td><input type="time" name="thursday_start" onChange={onChange} value={constraints[semester].thursday_start} /></td>
                  <td><input type="time" name="thursday_end" onChange={onChange} value={constraints[semester].thursday_end} /></td>
                  <td><input type="text" name="thursday_notes" className="notes" onChange={onChange} value={constraints[semester].thursday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='friday'>{props.t.friday}</label></td>
                  <td><input type="time" name="friday_start" onChange={onChange} value={constraints[semester].friday_start} /></td>
                  <td><input type="time" name="friday_end" onChange={onChange} value={constraints[semester].friday_end} /></td>
                  <td><input type="text" name="friday_notes" className="notes" onChange={onChange} value={constraints[semester].friday_notes} dir={props.dir} /></td>
                </tr>
              </tbody>
            </table>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>{props.t.consecutive_hours_msg}</label>
              <textarea dir={props.dir} name="course_comments" cols="40" rows="5" onChange={onChange} value={constraints[semester].course_comments}></textarea>
            </div>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>{props.t.general_comments}</label>
              <textarea dir={props.dir} name="general_comments" cols="40" rows="5" onChange={onChange} value={constraints[semester].general_comments}></textarea>
            </div>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>{props.t.critical_comments}</label>
              <textarea dir={props.dir} name="critical_comments" cols="40" rows="5" onChange={onChange} value={constraints[semester].critical_comments}></textarea>
            </div>
            {props.authObj.user.can_submit ? <input type='submit' value={props.t.submit_schedule} className='btn btn-primary btn-block center-horizontaly medium-btn' /> : <div className='warning center-horizontaly'>{props.t.cant_submit_msg}</div>}
          </form>
          : <form onSubmit={onSubmit}>
            <table className={`sumbit-schedule-table ${props.dir}`}>
              <thead>
                <tr className="text-center">
                  <th>{props.t.notes}</th>
                  <th>{props.t.end}</th>
                  <th>{props.t.start}</th>
                  <th>{props.t.day}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="text" name="sunday_notes" className="notes" onChange={onChange} value={constraints[semester].sunday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="sunday_end" onChange={onChange} value={constraints[semester].sunday_end} /></td>
                  <td><input type="time" name="sunday_start" onChange={onChange} value={constraints[semester].sunday_start} /></td>
                  <td><label htmlFor='sunday'>{props.t.sunday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="monday_notes" className="notes" onChange={onChange} value={constraints[semester].monday_notes} dir={props.dir} /></td>
                  <td> <input type="time" name="monday_end" onChange={onChange} value={constraints[semester].monday_end} /></td>
                  <td><input type="time" name="monday_start" onChange={onChange} value={constraints[semester].monday_start} /></td>
                  <td> <label htmlFor='monday'>{props.t.monday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="tuesday_notes" className="notes" onChange={onChange} value={constraints[semester].tuesday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="tuesday_end" onChange={onChange} value={constraints[semester].tuesday_end} /></td>
                  <td><input type="time" name="tuesday_start" onChange={onChange} value={constraints[semester].tuesday_start} /></td>
                  <td><label htmlFor='tuesday'>{props.t.tuesday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="wednesday_notes" className="notes" onChange={onChange} value={constraints[semester].wednesday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="wednesday_end" onChange={onChange} value={constraints[semester].wednesday_end} /></td>
                  <td> <input type="time" name="wednesday_start" onChange={onChange} value={constraints[semester].wednesday_start} /></td>
                  <td><label htmlFor='wednesday'>{props.t.wednesday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="thursday_notes" className="notes" onChange={onChange} value={constraints[semester].thursday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="thursday_end" onChange={onChange} value={constraints[semester].thursday_end} /></td>
                  <td><input type="time" name="thursday_start" onChange={onChange} value={constraints[semester].thursday_start} /></td>
                  <td><label htmlFor='thursday'>{props.t.thursday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="friday_notes" className="notes" onChange={onChange} value={constraints[semester].friday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="friday_end" onChange={onChange} value={constraints[semester].friday_end} /></td>
                  <td><input type="time" name="friday_start" onChange={onChange} value={constraints[semester].friday_start} /></td>
                  <td><label htmlFor='friday'>{props.t.friday}</label></td>
                </tr>
              </tbody>
            </table>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>{props.t.consecutive_hours_msg}</label>
              <textarea dir={props.dir} name="course_comments" cols="40" rows="5" onChange={onChange} value={constraints[semester].course_comments}></textarea>
            </div>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>{props.t.general_comments}</label>
              <textarea dir={props.dir} name="general_comments" cols="40" rows="5" onChange={onChange} value={constraints[semester].general_comments}></textarea>
            </div>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>{props.t.critical_comments}</label>
              <textarea dir={props.dir} name="critical_comments" cols="40" rows="5" onChange={onChange} value={constraints[semester].critical_comments}></textarea>
            </div>
            {props.authObj.user.can_submit ? <input type='submit' value={props.t.submit_schedule} className='btn btn-primary btn-block center-horizontaly medium-btn' /> : <div className='warning center-horizontaly'>{props.t.cant_submit_msg}</div>}
          </form>}
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

export default connect(mapStateToProps)(SubmitSchedule);
