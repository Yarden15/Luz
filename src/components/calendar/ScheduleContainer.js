import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScheduleItem from './ScheduleItem';

const ScheduleContainer = () => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-9">
           <ScheduleItem title={'נביאים'}/>
        </div>
      </div>

      <ScheduleItem title={'קמפוס החרדי'}/>
        
    </div>
  );
};

export default ScheduleContainer;
