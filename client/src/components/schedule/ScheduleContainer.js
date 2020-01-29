import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { createCalendar } from '../../actions/scheduleActions';
import { getSchedules } from '../../actions/scheduleActions';

export class ScheduleContainer extends Component {
  componentDidMount() {
    // getSchedules();
  }

  render() {
    if (this.props.scheduleObj.schedules[this.props.scheduleObj.current]) {
      return (
        <Fragment>
          <div key={this.props.scheduleObj.current}>
            <h1 className='calendar-title'>{this.props.scheduleObj.schedules[this.props.scheduleObj.current].title}</h1>
            {this.props.scheduleObj.schedules[this.props.scheduleObj.current] === null ? "" : this.props.scheduleObj.schedules[this.props.scheduleObj.current].calendar}
          </div>
        </Fragment>
      );
    } else {
      return null;
    }
  };
}

const mapStateToProps = state => {
  return {
    scheduleObj: state.schedule
  };
};

export default connect(mapStateToProps, { createCalendar })(ScheduleContainer);

