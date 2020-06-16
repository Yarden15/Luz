import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { selectCalendar, createSchdule, deleteAlert } from '../../actions/scheduleActions';

export class SchedulesBar extends Component {
  render() {
    const scheds = this.props.schedules;
    return (
      <div id='schedules-bar'>
        <div className="tabset"> {
          Object.keys(scheds).map(key => (
            <Fragment key={"bar-" + scheds[key].id}>
              <input onClick={() => selectCalendar(scheds[key].id)} type="radio" name="tabset"
                id={scheds[key].id} aria-controls={scheds[key].title} defaultChecked />
              <label dir={this.props.dir} htmlFor={scheds[key].id}>
                {scheds[key].location} {this.props.t.year} {this.props.t[scheds[key].year]} {this.props.t.semester} {this.props.t[scheds[key].semester]}
                </label>
              <i className="far fa-trash-alt" onClick={() => { this.forceUpdate(); deleteAlert(scheds[key]); }}></i>
            </Fragment>
          ))
        }
          <span onClick={() => createSchdule()}><i className="fas fa-plus"></i></span>
          {Object.keys(scheds).length === 0 && <i id="no-sched-ptr" className="fas fa-mouse-pointer"></i>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    schedules: state.schedule.schedules,
    counter: state.schedule.counter,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps, { selectCalendar })(SchedulesBar);
