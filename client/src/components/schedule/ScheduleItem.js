import React from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PropTypes from 'prop-types';
import Alert from "sweetalert2";

const ScheduleItem = ({ title }) => {
  return (
    <div className='calendar'>
      <h1 className='calendar-title'>{title}</h1>
      <FullCalendar
        defaultView='timeGridWeek'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        header={{
          center: '',
          left: '',
          right: ''
        }}
        hiddenDays={[6]}
        allDaySlot={false}
        slotDuration='00:30:00'
        snapDuration='00:05:00'
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
        eventClick={eventClick}
        events={[]}
      />
    </div>
  )
}

const eventClick = eventClick => {
  Alert.fire({
    title: eventClick.event.title,
    html:
      `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>id</td>
      <td><strong>` +
      eventClick.event.id +
      `</strong></td>
      </tr>
      <tr >
      </tr>
      </tbody>
      </table>
      </div>`,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Remove Event",
    cancelButtonText: "Close"
  }).then(result => {
    if (result.value) {
      eventClick.event.remove(); // It will remove event from the calendar
      Alert.fire("Deleted!", "Your Event has been deleted.", "success");
    }
  });
};


ScheduleItem.defaultProps = {
  title: 'Title - name of the schedule and etc..'
}

ScheduleItem.propTypes = {
  title: PropTypes.string.isRequired
}
export default ScheduleItem;


