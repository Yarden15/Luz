import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// import './app.css'; // webpack must be configured to do this

export default class Calander extends React.Component {
  render() {
    return (
      <FullCalendar defaultView='dayGridMonth' plugins={[dayGridPlugin]} />
    );
  }
}
