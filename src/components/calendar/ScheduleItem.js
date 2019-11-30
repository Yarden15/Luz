import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import '../../App.css'; // webpack must be configured to do this

export default class ScheduleItem extends React.Component {
  render() {
    return (
      <FullCalendar
        defaultView='timeGridWeek'
        plugins={[dayGridPlugin, timeGridPlugin]}
        header={{
          center: 'title',
          left: '',
          right: ''
        }}
      />
    );
  }
}
