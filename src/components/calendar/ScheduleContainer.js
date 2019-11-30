import React, { Fragment } from 'react';
import ScheduleItem from './ScheduleItem';

const ScheduleContainer = () => {
  return (
    <Fragment>
      <div>
        <ScheduleItem key='1' />
      </div>
      <div>
        <ScheduleItem key='2' />
      </div>
    </Fragment>
  );
};

export default ScheduleContainer;
