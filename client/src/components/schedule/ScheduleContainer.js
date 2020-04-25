import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { createCalendar } from '../../actions/scheduleActions';
import { getSchedules } from '../../actions/scheduleActions';
import { getLocations } from '../../actions/adminActions';
import Spinner from '../layout/Spinner';

export class ScheduleContainer extends Component {
  componentDidMount() {
    getSchedules();
    getLocations();
  }

  render() {
    if (this.props.scheduleObj.loading) {
      return (
        <div id='schedules-spinner'>
          <Spinner id='spinner-events-container' />
        </div>)
    } else if (this.props.scheduleObj.schedules[this.props.scheduleObj.current]) {
      return (
        <Fragment key={this.props.scheduleObj.current}>
          <div key={this.props.scheduleObj.current}>
            <h1 className='calendar-title'>
              {this.props.scheduleObj.schedules[this.props.scheduleObj.current].title}
            </h1>

            <table className="sched-details">
              <thead>
                <tr >
                  <th>{this.props.t.year}: {this.props.t[this.props.scheduleObj.schedules[this.props.scheduleObj.current].year]}</th>
                  <th>{this.props.t.semester}: {this.props.t[this.props.scheduleObj.schedules[this.props.scheduleObj.current].semester]}</th>
                  <th>{this.props.t.location}: {this.props.scheduleObj.schedules[this.props.scheduleObj.current].location}</th>
                </tr>
              </thead>
            </table>
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
    scheduleObj: state.schedule,
    t: state.literals.literals
  };
};

export default connect(mapStateToProps, { createCalendar })(ScheduleContainer);

