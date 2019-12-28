import React from 'react';
import FullCalendar from '@fullcalendar/react';
//import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PropTypes from 'prop-types'
// import '../../App.css'; // webpack must be configured to do this



const ScheduleItem = ({ title }) => {
  return (
    <div className='calendar-1'>

      <h1 className='calendar-title'>{title}</h1>
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
        titleFormat={{ weekday: 'long' }}
        columnHeaderFormat={{ weekday: 'long' }}
      />
    </div>
  )
}

ScheduleItem.defaultProps = {
  title: 'Title - name of the schedule and etc..'
}

ScheduleItem.propTypes = {
  title: PropTypes.string.isRequired
}
export default ScheduleItem;