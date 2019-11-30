import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin, { DayGrid } from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import '../../App.css'; // webpack must be configured to do this

export default class ScheduleItem extends React.Component {
  render() {
    return (
      <div className='calendar-1'>
        <FullCalendar
          defaultView='timeGridWeek'
          plugins={[dayGridPlugin, timeGridPlugin]}
          header={{
            center: 'title',
            left: '',
            right: ''
          }}
          hiddenDays={[6]}
          allDaySlot={false}
          minTime="07:00:00"
          maxTime="23:00:00"

        />
      </div>
    )
  }
}