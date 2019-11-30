import React from 'react';
import FullCalendar from '@fullcalendar/react';
//import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
// import '../../App.css'; // webpack must be configured to do this



const  ScheduleItem = () => {
    return (
      <div className='calendar-1'>

       <h1 className='calendar-title'>Title - name of the schedule and etc..</h1>
        <FullCalendar
          defaultView='timeGridWeek'
          plugins={[dayGridPlugin, timeGridPlugin]}
          header={{
            center: '',
            left: '',
            right: ''
          }}
          hiddenDays={[6]}
          allDaySlot={false}
           minTime="07:00:00"
           maxTime="23:00:00"
           height="auto"
           titleFormat={{weekday: 'long'}}
           columnHeaderFormat={{weekday:'long'}}
        />
      </div>
    )
  }
  
export default ScheduleItem;