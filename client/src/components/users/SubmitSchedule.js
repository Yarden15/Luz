import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';

const SubmitSchedule = props => {

  let userSchedule = {
    sunday_start: '',
    sunday_end: '',
    sunday_notes: '',
    monday_start: '',
    monday_end: '',
    monday_notes: '',
    tuesday_start: '',
    tuesday_end: '',
    tuesday_notes: '',
    wednesday_start: '',
    wednesday_end: '',
    wednesday_notes: '',
    thursday_start: '',
    thursday_end: '',
    thursday_notes: '',
    friday_start: '',
    friday_end: '',
    friday_notes: '',
    course_comments: '',
    general_comments: '',
    critical_comments: ''
  };
  const [schedule, setSchedule] = useState(
    {
      sunday_start: userSchedule.sunday_start,
      sunday_end: userSchedule.sunday_end,
      sunday_notes: userSchedule.sunday_notes,
      monday_start: userSchedule.monday_start,
      monday_end: userSchedule.monday_end,
      monday_notes: userSchedule.monday_notes,
      tuesday_start: userSchedule.tuesday_start,
      tuesday_end: userSchedule.tuesday_end,
      tuesday_notes: userSchedule.tuesday_notes,
      wednesday_start: userSchedule.wednesday_start,
      wednesday_end: userSchedule.wednesday_end,
      wednesday_notes: userSchedule.wednesday_notes,
      thursday_start: userSchedule.thursday_start,
      thursday_end: userSchedule.thursday_end,
      thursday_notes: userSchedule.thursday_notes,
      friday_start: userSchedule.friday_start,
      friday_end: userSchedule.friday_end,
      friday_notes: userSchedule.friday_notes,
      course_comments: userSchedule.course_comments,
      general_comments: userSchedule.general_comments,
      critical_comments: userSchedule.critical_comments
    }
  );

  const { sunday_start,
    sunday_end,
    sunday_notes,
    monday_start,
    monday_end,
    monday_notes,
    tuesday_start,
    tuesday_notes,
    tuesday_end,
    wednesday_start,
    wednesday_notes,
    wednesday_end,
    thursday_start,
    thursday_end,
    thursday_notes,
    friday_start,
    friday_end,
    friday_notes,
    course_comments,
    general_comments,
    critical_comments } = schedule;

  const onChange = e => setSchedule({ ...schedule, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(sunday_start,
      sunday_end,
      sunday_notes,
      monday_start,
      monday_end,
      monday_notes,
      tuesday_start,
      tuesday_end,
      tuesday_notes,
      wednesday_start,
      wednesday_end,
      wednesday_notes,
      thursday_start,
      thursday_end,
      thursday_notes,
      friday_start,
      friday_end,
      friday_notes,
      course_comments,
      general_comments,
      critical_comments);
    //updateSchedule({ sunday, monday, tuesday, wednesday, thursday, friday });
  }


  return (
    <Fragment>
      <Menu />
      <div className='form-container submit-schedule'>
        <h1>{props.t.submit_schedule}</h1>
        {props.dir === 'ltr' ?
          <form onSubmit={onSubmit}>
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
                  <td><input type="time" name="sunday_start" onChange={onChange} value={sunday_start} /></td>
                  <td><input type="time" name="sunday_end" onChange={onChange} value={sunday_end} /></td>
                  <td><input type="text" name="sunday_notes" className="notes" onChange={onChange} value={sunday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td> <label htmlFor='monday'>{props.t.monday}</label></td>
                  <td><input type="time" name="monday_start" onChange={onChange} value={monday_start} /></td>
                  <td> <input type="time" name="monday_end" onChange={onChange} value={monday_end} /></td>
                  <td><input type="text" name="monday_notes" className="notes" onChange={onChange} value={monday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='tuesday'>{props.t.tuesday}</label></td>
                  <td><input type="time" name="tuesday_start" onChange={onChange} value={tuesday_start} /></td>
                  <td><input type="time" name="tuesday_end" onChange={onChange} value={tuesday_end} /></td>
                  <td><input type="text" name="tuesday_notes" className="notes" onChange={onChange} value={tuesday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='wednesday'>{props.t.wednesday}</label></td>
                  <td> <input type="time" name="wednesday_start" onChange={onChange} value={wednesday_start} /></td>
                  <td><input type="time" name="wednesday_end" onChange={onChange} value={wednesday_end} /></td>
                  <td><input type="text" name="wednesday_notes" className="notes" onChange={onChange} value={wednesday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='thursday'>{props.t.thursday}</label></td>
                  <td><input type="time" name="thursday_start" onChange={onChange} value={thursday_start} /></td>
                  <td><input type="time" name="thursday_end" onChange={onChange} value={thursday_end} /></td>
                  <td><input type="text" name="thursday_notes" className="notes" onChange={onChange} value={thursday_notes} dir={props.dir} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='friday'>{props.t.friday}</label></td>
                  <td><input type="time" name="friday_start" onChange={onChange} value={friday_start} /></td>
                  <td><input type="time" name="friday_end" onChange={onChange} value={friday_end} /></td>
                  <td><input type="text" name="friday_notes" className="notes" onChange={onChange} value={friday_notes} dir={props.dir} /></td>
                </tr>
              </tbody>
            </table>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>עבור כל קורס, כמה שעות רצוף הקורס צריך להיות</label>
              <textarea dir={props.dir} name="course_comments" cols="40" rows="5" onChange={onChange} value={course_comments}></textarea>
            </div>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>הערות כלליות</label>
              <textarea dir={props.dir} name="general_comments" cols="40" rows="5" onChange={onChange} value={general_comments}></textarea>
            </div>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>הערות קריטיות</label>
              <textarea dir={props.dir} name="critical_comments" cols="40" rows="5" onChange={onChange} value={critical_comments}></textarea>
            </div>
            <input type='submit' value={props.t.submit_schedule} className='btn btn-primary btn-block center-horizontaly' />
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
                  <td><input type="text" name="sunday_notes" className="notes" onChange={onChange} value={sunday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="sunday_end" onChange={onChange} value={sunday_end} /></td>
                  <td><input type="time" name="sunday_start" onChange={onChange} value={sunday_start} /></td>
                  <td><label htmlFor='sunday'>{props.t.sunday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="monday_notes" className="notes" onChange={onChange} value={monday_notes} dir={props.dir} /></td>
                  <td> <input type="time" name="monday_end" onChange={onChange} value={monday_end} /></td>
                  <td><input type="time" name="monday_start" onChange={onChange} value={monday_start} /></td>
                  <td> <label htmlFor='monday'>{props.t.monday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="tuesday_notes" className="notes" onChange={onChange} value={tuesday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="tuesday_end" onChange={onChange} value={tuesday_end} /></td>
                  <td><input type="time" name="tuesday_start" onChange={onChange} value={tuesday_start} /></td>
                  <td><label htmlFor='tuesday'>{props.t.tuesday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="wednesday_notes" className="notes" onChange={onChange} value={wednesday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="wednesday_end" onChange={onChange} value={wednesday_end} /></td>
                  <td> <input type="time" name="wednesday_start" onChange={onChange} value={wednesday_start} /></td>
                  <td><label htmlFor='wednesday'>{props.t.wednesday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="thursday_notes" className="notes" onChange={onChange} value={thursday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="thursday_end" onChange={onChange} value={thursday_end} /></td>
                  <td><input type="time" name="thursday_start" onChange={onChange} value={thursday_start} /></td>
                  <td><label htmlFor='thursday'>{props.t.thursday}</label></td>
                </tr>
                <tr>
                  <td><input type="text" name="friday_notes" className="notes" onChange={onChange} value={friday_notes} dir={props.dir} /></td>
                  <td><input type="time" name="friday_end" onChange={onChange} value={friday_end} /></td>
                  <td><input type="time" name="friday_start" onChange={onChange} value={friday_start} /></td>
                  <td><label htmlFor='friday'>{props.t.friday}</label></td>
                </tr>
              </tbody>
            </table>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>עבור כל קורס, כמה שעות רצוף הקורס צריך להיות</label>
              <textarea dir={props.dir} name="course_comments" cols="40" rows="5" onChange={onChange} value={course_comments}></textarea>
            </div>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>הערות כלליות</label>
              <textarea dir={props.dir} name="general_comments" cols="40" rows="5" onChange={onChange} value={general_comments}></textarea>
            </div>
            <div className={`comment ${props.dir}`}>
              <label htmlFor='comment'>הערות קריטיות</label>
              <textarea dir={props.dir} name="critical_comments" cols="40" rows="5" onChange={onChange} value={critical_comments}></textarea>
            </div>
            <input type='submit' value={props.t.submit_schedule} className='btn btn-primary btn-block center-horizontaly medium-btn' />
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
