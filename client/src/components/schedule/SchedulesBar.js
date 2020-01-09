import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createCalendar} from '../../actions/scheduleActions';


export class SchedulesBar extends Component {
  render() {
    return (
      <div id='schedules-bar'>
        <ul>
          {this.props.scheduleObj.schedules.map(schedule => (
            <li>{schedule.title}</li>
          ))}
          <li onClick={() => createCalendar('yarden2')}>create new calendar</li>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    scheduleObj: state.schedule
  };
};

export default connect(mapStateToProps,{createCalendar})(SchedulesBar);



