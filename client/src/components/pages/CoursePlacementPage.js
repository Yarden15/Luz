import React, { Fragment, useEffect } from 'react';
import SceduleContainer from '../schedule/ScheduleContainer';
import EventsContainer from '../event/eventsContainer';
import ScheduleBar from '../schedule/SchedulesBar';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

const CoursePlacementPage = (props) => {
  // Load user in this component
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  if (props.dir === 'rtl') {
    return (
      <Fragment>
        <ScheduleBar />
        <div className='row '>
          <div className='col-sm-9'>
            <SceduleContainer />
          </div>
          <div className='col-sm-3'>
            <EventsContainer />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return(
    <Fragment>
      <ScheduleBar />
      <div className='row '>
        <div className='col-sm-3'>
          <EventsContainer />
        </div>
        <div className='col-sm-9'>
          <SceduleContainer />
        </div>
      </div>
    </Fragment>
    )};
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(CoursePlacementPage);
