import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import '../../App.css'; // webpack must be configured to do this

export default class Schedule extends React.Component {
  render() {
    return (
      <FullCalendar
        defaultView='dayGridWeek'
        plugins={[dayGridPlugin, timeGridPlugin]}
      />
    );
  }
}
