import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScheduleItem from './ScheduleItem';
import EventsContainer from '../event/eventsContainer';

const ScheduleContainer = () => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-3">
          <EventsContainer />
        </div>
        <div className="col-sm-9">
          <ScheduleItem title={'נביאים'} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleContainer;
