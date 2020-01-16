import React, { Fragment, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { createCalendar } from '../../actions/scheduleActions';

export class ScheduleContainer extends Component {
  render() {
    return (
      <Fragment>
        <div key={this.props.scheduleObj.current}>
          {this.props.scheduleObj.schedules[this.props.scheduleObj.current] == null ? "" : this.props.scheduleObj.schedules[this.props.scheduleObj.current].calendar }
        </div>
      </Fragment>
    );
  };
}

const mapStateToProps = state => {
  return {
    scheduleObj: state.schedule
  };
};


export default connect(mapStateToProps, { createCalendar })(ScheduleContainer);

