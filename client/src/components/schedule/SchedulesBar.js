import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCalendar, enterNameSchedule } from '../../actions/scheduleActions';
import nextId from 'react-id-generator';

export class SchedulesBar extends Component {
  render() {
    let title = nextId();
    return (
      <div id='schedules-bar'>
        <ul> {
          Object.keys(this.props.scheduleObj.schedules).map(key => (
            <li onClick={() => selectCalendar(this.props.scheduleObj.schedules[key].id)} key={this.props.scheduleObj.schedules[key].id}>
              {this.props.scheduleObj.schedules[key].title}</li>
          ))
        }
          <li onClick={() => enterNameSchedule()}>create new calendar</li>
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

export default connect(mapStateToProps, { selectCalendar })(SchedulesBar);



