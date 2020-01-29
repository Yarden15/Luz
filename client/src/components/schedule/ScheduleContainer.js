import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { createCalendar } from '../../actions/scheduleActions';
import { getSchedules } from '../../actions/scheduleActions';
import Spinner from '../layout/Spinner';

export class ScheduleContainer extends Component {
  componentDidMount() {
    console.log('on get schedules');
     getSchedules();
  }

  render() {
    if(this.props.scheduleObj.loading){
      return (
        <div id='schedules-spinner'>
          <Spinner id='spinner-events-container' />
        </div>)
    } else if (this.props.scheduleObj.schedules[this.props.scheduleObj.current]) {
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

