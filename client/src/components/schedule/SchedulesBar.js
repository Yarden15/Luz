import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { selectCalendar, enterNameSchedule, deleteAlert } from '../../actions/scheduleActions';

export class SchedulesBar extends Component {
  render() {
    return (
      <div id='schedules-bar'>
        <div className="tabset"> {
          Object.keys(this.props.schedules).map(key => (
            <Fragment key={this.props.schedules[key].id}>
              <input onClick={() => selectCalendar(this.props.schedules[key].id)}
                type="radio" name="tabset" id={this.props.schedules[key].id}
                aria-controls={this.props.schedules[key].title} defaultChecked />
              <label for={this.props.schedules[key].id}>{this.props.schedules[key].title}</label>
              <i className="far fa-trash-alt" onClick={() => deleteAlert()}></i>
            </Fragment>
          ))
        }
          <span onClick={() => enterNameSchedule()}><i className="fas fa-plus"></i></span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    schedules: state.schedule.schedules,
  };
};

export default connect(mapStateToProps, { selectCalendar })(SchedulesBar);




// <li onClick={() => selectCalendar(this.props.schedules[key].id)} key={this.props.schedules[key].id}>
//               {this.props.schedules[key].title}</li>

// <li onClick={() => enterNameSchedule()}>create new calendar</li>