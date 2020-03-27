import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';

const SubmitSchedule = props => {

  let userSchedule = {
    sunday_start: '',
    sunday_end: '',
    monday_start: '',
    monday_end: '',
    tuesday_start: '',
    tuesday_end: '',
    wednesday_start: '',
    wednesday_end: '',
    thursday_start: '',
    thursday_end: '',
    friday_start: '',
    friday_end: '',
  };
  const [schedule, setSchedule] = useState(
    {
      sunday_start: userSchedule.sunday_start,
      sunday_end: userSchedule.sunday_end,
      monday_start: userSchedule.monday_start,
      monday_end: userSchedule.monday_end,
      tuesday_start: userSchedule.tuesday_start,
      tuesday_end: userSchedule.tuesday_end,
      wednesday_start: userSchedule.wednesday_start,
      wednesday_end: userSchedule.wednesday_end,
      thursday_start: userSchedule.thursday_start,
      thursday_end: userSchedule.thursday_end,
      friday_start: userSchedule.friday_start,
      friday_end: userSchedule.friday_end,
    }
  );

  const { sunday_start,
    sunday_end,
    monday_start,
    monday_end,
    tuesday_start,
    tuesday_end,
    wednesday_start,
    wednesday_end,
    thursday_start,
    thursday_end,
    friday_start,
    friday_end, } = schedule;

  const onChange = e => setSchedule({ ...schedule, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(sunday_start,
      sunday_end,
      monday_start,
      monday_end,
      tuesday_start,
      tuesday_end,
      wednesday_start,
      wednesday_end,
      thursday_start,
      thursday_end,
      friday_start,
      friday_end);
    //updateSchedule({ sunday, monday, tuesday, wednesday, thursday, friday });
  }


  return (
    <Fragment>
      <Menu />
      <div className='form-container'>
        <h1>{props.t.submit_schedule}</h1>
        {props.dir === 'ltr' ?
          <form onSubmit={onSubmit}>
            <table className="sumbit-schedule-table">
              <thead>
                <tr className="text-center">
                  <th>{props.t.day}</th>
                  <th>{props.t.start}</th>
                  <th>{props.t.end}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><label htmlFor='sunday'>{props.t.sunday}</label></td>
                  <td><input type="time" name="sunday_start" onChange={onChange} value={sunday_start} /></td>
                  <td><input type="time" name="sunday_end" onChange={onChange} value={sunday_end} /></td>
                </tr>
                <tr>
                  <td> <label htmlFor='monday'>{props.t.monday}</label></td>
                  <td><input type="time" name="monday_start" onChange={onChange} value={monday_start} /></td>
                  <td> <input type="time" name="monday_end" onChange={onChange} value={monday_end} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='tuesday'>{props.t.tuesday}</label></td>
                  <td><input type="time" name="tuesday_start" onChange={onChange} value={tuesday_start} /></td>
                  <td><input type="time" name="tuesday_end" onChange={onChange} value={tuesday_end} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='wednesday'>{props.t.wednesday}</label></td>
                  <td> <input type="time" name="wednesday_start" onChange={onChange} value={wednesday_start} /></td>
                  <td><input type="time" name="wednesday_end" onChange={onChange} value={wednesday_end} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='thursday'>{props.t.thursday}</label></td>
                  <td><input type="time" name="thursday_start" onChange={onChange} value={thursday_start} /></td>
                  <td><input type="time" name="thursday_end" onChange={onChange} value={thursday_end} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='friday'>{props.t.friday}</label></td>
                  <td><input type="time" name="friday_start" onChange={onChange} value={friday_start} /></td>
                  <td><input type="time" name="friday_end" onChange={onChange} value={friday_end} /></td>
                </tr>
              </tbody>
            </table>
            <input type='submit' value={props.t.submit_schedule} className='btn btn-primary btn-block center-horizontaly' />
          </form>
          : <form onSubmit={onSubmit}>
            <table className="sumbit-schedule-table">
              <thead>
                <tr className="text-center">
                  <th>{props.t.end}</th>
                  <th>{props.t.start}</th>
                  <th>{props.t.day}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="time" name="sunday_end" onChange={onChange} value={sunday_end} /></td>
                  <td><input type="time" name="sunday_start" onChange={onChange} value={sunday_start} /></td>
                  <td><label htmlFor='sunday'>{props.t.sunday}</label></td>
                </tr>
                <tr>
                  <td> <input type="time" name="monday_end" onChange={onChange} value={monday_end} /></td>
                  <td><input type="time" name="monday_start" onChange={onChange} value={monday_start} /></td>
                  <td> <label htmlFor='monday'>{props.t.monday}</label></td>
                </tr>
                <tr>
                  <td><input type="time" name="tuesday_end" onChange={onChange} value={tuesday_end} /></td>
                  <td><input type="time" name="tuesday_start" onChange={onChange} value={tuesday_start} /></td>
                  <td><label htmlFor='tuesday'>{props.t.tuesday}</label></td>
                </tr>
                <tr>
                  <td><input type="time" name="wednesday_end" onChange={onChange} value={wednesday_end} /></td>
                  <td> <input type="time" name="wednesday_start" onChange={onChange} value={wednesday_start} /></td>
                  <td><label htmlFor='wednesday'>{props.t.wednesday}</label></td>
                </tr>
                <tr>
                  <td><input type="time" name="thursday_end" onChange={onChange} value={thursday_end} /></td>
                  <td><input type="time" name="thursday_start" onChange={onChange} value={thursday_start} /></td>
                  <td><label htmlFor='thursday'>{props.t.thursday}</label></td>
                </tr>
                <tr>
                  <td><input type="time" name="friday_end" onChange={onChange} value={friday_end} /></td>
                  <td><input type="time" name="friday_start" onChange={onChange} value={friday_start} /></td>
                  <td><label htmlFor='friday'>{props.t.friday}</label></td>
                </tr>
              </tbody>
            </table>
            <input type='submit' value={props.t.submit_schedule} className='btn btn-primary btn-block center-horizontaly' />
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
