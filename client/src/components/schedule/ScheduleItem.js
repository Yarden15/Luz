import React from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PropTypes from 'prop-types';
import { eventClick } from "../../actions/scheduleActions";

const ScheduleItem = () => {
  //   return (
  //     <div className='calendar'>
  //       <h1 className='calendar-title'>{title}</h1>
  //       <FullCalendar
  //         defaultView='timeGridWeek'
  //         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  //         header={{
  //           center: '',
  //           left: '',
  //           right: ''
  //         }}
  //         hiddenDays={[6]}
  //         allDaySlot={false}
  //         slotDuration='00:30:00'
  //         snapDuration='00:05:00'
  //         minTime="07:00:00"
  //         maxTime="23:00:00"
  //         height="auto"
  //         titleFormat={{ weekday: 'long' }}
  //         columnHeaderFormat={{ weekday: 'long' }}
  //         selectable={true}
  //         selectHelper={true}
  //         editable={true}
  //         droppable={true}
  //         eventLimit={true}
  //         eventClick={eventClick}
  //         events={[]}
  //       />
  //     </div>
  //   )
}


export default ScheduleItem;


