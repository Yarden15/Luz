import { GET_SCHEDULES, SET_LOADING, SCHEDULE_ERROR, CREATE_CALENDAR, SELECT_CALENDAR, DELETE_SCHEDULE, ADD_EVENT, DELETE_EVENT, EVENT_CHANGED } from './types';
import Alert from "sweetalert2";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import axios from 'axios';
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
      id={id}
      defaultView='timeGridWeek'
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      customButtons={{
        save: {
          text: 'Save',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      }}
      header={{
        center: '',
        left: '',
        right: 'save'
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
      eventDrop={function (info) { eventChanged(info, id); }}
      eventReceive={function (info) { addEvent(info, id); forceSchedsUpdate(id); }}
      eventResize={function (info) { eventChanged(info, id); }}
      eventLimit={true}
      eventClick={eventClick}
      events={[]}
      locale='en'
      dir='ltr' />
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

  let event = createEventObj(info, id, 'create');
  //save on the shcedule array
  store.dispatch({
    type: ADD_EVENT,
    payload:
    {
      event: event,
      schedId: id,
    }
  })

  //chackOnServer(event);
}

//popup window when the user clicking on the event into the calendar
export const eventClick = eventClick => {
  Alert.fire({
    title: eventClick.event.title + '\n ID: ' + eventClick.event.extendedProps.serial_num,
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
  let event = createEventObj(info, schedId, 'change');

  store.dispatch({
    type: EVENT_CHANGED,
    payload: event
  });

  //chackOnServer(event);
}

const chackOnServer = async event => {
  let scedules = store.getState().schedule.schedules;
  try {
    const res = await axios.get('', event, scedules);
    store.dispatch({
      type: 'STEP_CHECK',
      payload: res.data
    });
  } catch (error) {
    store.dispatch({
      type: 'EVENT_ERROR',
      payload: error.response.data
    });
  }
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

const createEventObj = (info, schedId, status) => {
  let event;
  if (status === 'create') {
    event = {
      schedId,
      eventId: info.event._def.publicId,
      title: info.draggedEl.getAttribute('title'),
      id_number: info.draggedEl.getAttribute('id_number'),
      serial_num: info.draggedEl.getAttribute('serial_num'),
      first_name: info.draggedEl.getAttribute('first_name'),
      last_name: info.draggedEl.getAttribute('last_name'),
      semester: info.draggedEl.getAttribute('semester'),
      location: info.draggedEl.getAttribute('location'),
      course_hours: info.draggedEl.getAttribute('course_hours'),
      year: info.draggedEl.getAttribute('year'),
      startTime: getTimeFromEvent(info.event._instance.range.start),
      endTime: getTimeFromEvent(info.event._instance.range.end),
      daysOfWeek: [info.event._instance.range.start.getDay()]
    };
  } else if (status === 'change') {
    event = {
      schedId,
      eventId: info.event._def.extendedProps.eventId,
      title: info.event._def.title,
      id_number: info.event._def.extendedProps.id_number,
      serial_num: info.event._def.extendedProps.serial_num,
      first_name: info.event._def.extendedProps.first_name,
      last_name: info.event._def.extendedProps.last_name,
      semester: info.event._def.extendedProps.semester,
      course_hours: info.event._def.extendedProps.course_hours,
      year: info.event._def.extendedProps.year,
      location: info.event._def.extendedProps.location,
      startTime: getTimeFromEvent(info.event._instance.range.start),
      endTime: getTimeFromEvent(info.event._instance.range.end),
      daysOfWeek: [info.event._instance.range.start.getDay()]
    };
  }


  return event;
}