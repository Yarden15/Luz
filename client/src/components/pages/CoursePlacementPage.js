import React, { Fragment, useEffect } from 'react';
import SceduleContainer from '../schedule/ScheduleContainer';
import EventsContainer from '../event/eventsContainer';
import ScheduleBar from '../schedule/SchedulesBar';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import Menu from '../layout/Menu';
import FilterEvents from '../layout/FilterEvents';

const CoursePlacementPage = props => {
  // Load user in this component
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  if (props.dir === 'rtl') {
    return (
      <Fragment>
        <Menu />
        <div className='row '>
          <div className='col-sm-9'>
            <ScheduleBar />
            <SceduleContainer />
          </div>
          <div className='col-sm-3'>
            <FilterEvents />
            <EventsContainer />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Menu />
        <div className='row '>
          <div className='col-sm-3'>
            <FilterEvents />
            <EventsContainer />
          </div>
          <div className='col-sm-9'>
            <ScheduleBar />
            <SceduleContainer />
          </div>
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(CoursePlacementPage);
