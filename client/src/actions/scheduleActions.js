import { GET_SCHEDULES, SET_LOADING, SCHEDULE_ERROR, CREATE_CALENDAR, SELECT_CALENDAR, DELETE_SCHEDULE, ADD_EVENT, DELETE_EVENT, EVENT_CHANGED } from './types';
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
      eventDrop={function (info) { eventChanged(info, id); forceSchedsUpdate(id); }}
      eventReceive={function (info) { addEvent(info, id); forceSchedsUpdate(id); }}
      eventResize={function (info) { eventChanged(info, id); forceSchedsUpdate(id); }}
      eventLimit={true}
      eventClick={eventClick}
      events={[]}
      id={id} />
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

const addEvent = (info, id) => {
  //check if this legal action
  info.schedId = id;
  let eventId = nextId();
  info.draggedEl.id = eventId;
  //save on the shcedule array
  store.dispatch({
    type: ADD_EVENT,
    payload:
    {
      event: {
        id: eventId,
        title: info.draggedEl.title,
        teacherid: info.draggedEl.getAttribute('teacherid'),
        courseid: info.draggedEl.getAttribute('courseid'),
        startTime: getTimeFromEvent(info.event._instance.range.start, 'add'),
        endTime: getTimeFromEvent(info.event._instance.range.end, 'add-end'),
        daysOfWeek: [info.event._instance.range.start.getDay()]
      },
      schedId: id,
    }
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
      store.dispatch({
        type: DELETE_EVENT,
        payload: { sched_id: eventClick.event._calendar.component.context.options.id, event_id: eventClick.event.id }
      })
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

const eventChanged = (info, schedId) => {
  store.dispatch({
    type: EVENT_CHANGED,
    payload: {
      schedId,
      eventId: info.event._def.publicId,
      startTime: getTimeFromEvent(info.event._instance.range.start),
      endTime: getTimeFromEvent(info.event._instance.range.end),
      daysOfWeek: info.event._instance.range.start.getDay()
    }
  });
}

const getTimeFromEvent = (time) => {
  let minutes, hours;
  minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  hours = (time.getHours() - 2) < 10 ? '0' + (time.getHours() - 2) : (time.getHours() - 2);

  return hours + ':' + minutes;
}

const forceSchedsUpdate = (id) => {
  selectCalendar(null); 
  selectCalendar(id);
}
