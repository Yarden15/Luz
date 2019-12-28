import React from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PropTypes from 'prop-types'




const ScheduleItem = ({ title }) => {
  return (
    <div className='calendar-1'>
      <h1 className='calendar-title'>{title}</h1>
      <FullCalendar
        defaultView='timeGridWeek'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        header={{
          center: '',
          left: '',
          right: ''
        }}
        hiddenDays={[7]}
        allDaySlot={false}
        minTime="07:00:00"
        maxTime="23:00:00"
        height="auto"
        titleFormat={{ weekday: 'long' }}
        columnHeaderFormat={{ weekday: 'long' }}
        selectable={true}
        selectHelper={true}
        editable={true}
        droppable={true}
        eventLimit={true}
        eventClick={function (info) {
          alert('Event: ' + info.event.title);
          alert('description:' + info.event.description);
          alert('View: ' + info.view.type);
        }}
        events={[{ title: 'test', date: '2019-12-28' },
        {
          title: 'אלגוריתמים - ערן לונדון',
          start: '2019-12-28T10:30:00',
          end: '2019-12-28T11:45:00',
          description: 'הרצאה',
          extendedProps: {
            department: 'מדעי המחשב'
          }

        }]}
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


// const initialize_calendar = () => {
//   var calendar = FullCalendar({
//     defaultView: 'timeGridWeek',
//     plugins: [dayGridPlugin, timeGridPlugin],
//     header: {
//       center: '',
//       left: '',
//       right: ''
//     },
//     hiddenDays: [6],
//     allDaySlot: false,
//     minTime: "07:00:00",
//     maxTime: "23:00:00",
//     height: "auto",
//     titleFormat: { weekday: 'long' },
//     columnHeaderFormat: { weekday: 'long' }
//   });
//   return calendar.render;
// }