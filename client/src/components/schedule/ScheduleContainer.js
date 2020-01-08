import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import {createCalendar} from '../../actions/scheduleActions';

export class ScheduleContainer extends Component {
  create(){
    this.props.createCalendar('sdada');
  }

  render() {
    return (
      <Fragment>
        {this.props.scheduleObj.schedules.map((schedule) =>
          <div key={schedule.id}>{schedule.calendar}</div>)}
      </Fragment>
    );
  };
}

const mapStateToProps = state => {
  return {
    scheduleObj: state.schedule
  };
};


export default connect(mapStateToProps,{createCalendar})(ScheduleContainer);

