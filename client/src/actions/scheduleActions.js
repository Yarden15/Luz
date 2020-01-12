import { GET_SCHEDULES, SET_LOADING, SCHEDULE_ERROR, CREATE_CALENDAR, SELECT_CALENDAR, DELETE_SCHEDULE, ADD_EVENT } from './types';
import Alert from "sweetalert2";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import store from '../store';
import nextId from 'react-id-generator';


//import thunk from 'redux-thunk'
//get schedules from db
export const getSchedules = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch('schedules');
    const data = await res.json();

    dispatch({
      type: GET_SCHEDULES,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error.response.data
    });
  }
};

//set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}

//create new schedule and push him to array
export const createCalendar = (title) => {
  let id = nextId();
  let calendarRef = React.createRef();
  let calendar = <div className='calendar'>
    <h1 className='calendar-title'>{title}</h1>
    <FullCalendar
      ref={calendarRef}
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
      drop={function (info) { eventDrop(info, id); }}
      eventResize={function (info) { eventDrop(info, id); }}
      eventLimit={true}
      eventClick={eventClick}
      events={[{ title: 'yarden', start: '2020-01-10T13:00', end: '2020-01-10T16:00' }]} />
  </div>
  store.dispatch({
    type: CREATE_CALENDAR,
    payload: { calendar, title, id, calendarRef }
  });
}
//select calendar to display
export const selectCalendar = (id) => {
  store.dispatch({
    type: SELECT_CALENDAR,
    payload: id
  });
}

export const eventDrop = (event, id) => {
  //check if this legal action
  
  //save on the DB/Schecdule
  store.dispatch({
    type: ADD_EVENT,
    payload: 
      {event: {title: event.draggedEl.title, id: event.draggedEl.id, start: event.date }
      ,id: id} 
  })
}

//popup window when the user clicking on the event into the calendar
export const eventClick = eventClick => {
  Alert.fire({
    title: eventClick.event.title + '\n ID: ' + eventClick.event.id,
    html:
      `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >

      <td><strong>` +
      //סידור עבודה של אותו אלמנט
      `</strong></td>
      </tr>
      <tr>
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
      Alert.fire("Deleted!", "The course has been deleted.", "success");
    }
  });
};

//popup message to insert title for the calendar
export const enterNameSchedule = () => {
  Alert.fire({
    title: 'Enter title please',
    input: 'text',
    showCancelButton: true,
    cancelButtonColor: "#3085d6",
    inputValidator: (result) => {
      if (!result)
        return 'You must insert input';
    }
  }).then(result => {
    if (result.value)
      createCalendar(result.value)
  })
}

export const deleteAlert = schedule => {
  Alert.fire({
    title: 'Are you sure you want to delete ' + schedule.title + ' schedule?',
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  }).then(result => {
    if (result.value) {
      // It will remove schedule 
      deleteSchedule(schedule.id);
      Alert.fire("Deleted!", "The schedule has been deleted.", "success");
    }
  });
}

export const deleteSchedule = id => {
  store.dispatch({
    type: DELETE_SCHEDULE,
    payload: id
  });
}