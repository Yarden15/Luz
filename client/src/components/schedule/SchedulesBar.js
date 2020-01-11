import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { selectCalendar, enterNameSchedule, deleteAlert } from '../../actions/scheduleActions';

export class SchedulesBar extends Component {
  render() {
    const scheds = this.props.schedules;
    return (
      <div id='schedules-bar'>
        <div className="tabset"> {
          Object.keys(scheds).map(key => (
            <Fragment key={scheds[key].id}>
              <input onClick={() => selectCalendar(scheds[key].id)} type="radio" name="tabset" 
              id={scheds[key].id} aria-controls={scheds[key].title} defaultChecked />
              <label htmlFor={scheds[key].id}>{scheds[key].title}</label>
              <i className="far fa-trash-alt" onClick={() => {deleteAlert(scheds[key]); this.forceUpdate(); }}></i>
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
