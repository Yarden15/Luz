import { GET_SCHEDULES, SET_LOADING_SCHED, SCHEDULE_ERROR, CREATE_CALENDAR, SELECT_CALENDAR, DELETE_SCHEDULE, ADD_EVENT, DELETE_EVENT, EVENT_CHANGED, CHANGE_LANG_SCHEDS, RENAME_SCHED } from './types';
import Alert from "sweetalert2";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import allLocales from '@fullcalendar/core/locales-all';
import React from 'react';
import axios from 'axios';
import store from '../store';
import uuid from 'react-uuid';
import { popupAlert } from './alertsActions';

//import thunk from 'redux-thunk'
//get schedules from db
export const getSchedules = async () => {
  try {
    setLoading();
    const res = await axios.get('/api/schedules');
    let schedules = res.data;

    for (let i = 0; i < schedules.length; i++) {
      createCalendar(schedules[i].title, schedules[i].sched_id, schedules[i].events, 1);
    }
  } catch (error) {
    console.error(error)
  };
}
// schedules[res.date[key].sched_id] = createCalendar(res.data[key].title,res.data[key].id,res.data[key].events,0);

const saveSchedule = async (sched_id, title, events) => {
  try {
    const res = await axios.post('/api/schedules', { sched_id, title, events });

    popupAlert('Congratulations!', res.data, 'regular');
  } catch (error) {
    console.error(error)
  }

}
//set loading to true
export const setLoading = () => {
  store.dispatch({
    type: SET_LOADING_SCHED
  });
}

//create new schedule and push him to array
export const createCalendar = (title, id = uuid(), events = [], newSched = 1) => {
  let t = store.getState().literals.literals;
  let calendarRef = React.createRef();
  let calendar = <div className='calendar'>
    <FullCalendar
      ref={calendarRef}
      id={id}
      defaultView='timeGridWeek'
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      customButtons={{
        save: {
          text: t.save,
          click: function () { saveButtonClicked() }
        },
        rename: {
          text: t.rename,
          click: function () { renameSched() }
        }
      }}
      header={{
        center: '',
        left: '',
        right: 'save rename'
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
      events={events}
      locales={allLocales}
      locale={store.getState().literals.lang}
      dir={store.getState().literals.dir} />
  </div>
  if (newSched) {
    store.dispatch({
      type: CREATE_CALENDAR,
      payload: { calendar, title, id, calendarRef }
    });
  } else {
    return { calendar, title, id, calendarRef };
  }
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
  let eventId = uuid();
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

const saveButtonClicked = () => {
  let current = store.getState().schedule.current;
  let schedule = store.getState().schedule.schedules[current];
  saveSchedule(schedule.id, schedule.title, schedule.calendarRef.current.props.events);
}

//popup window when the user clicking on the event into the calendar
export const eventClick = eventClick => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title: eventClick.event.title + '\n SN: ' + eventClick.event.extendedProps.serial_num,
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
    confirmButtonText: t.remove_event,
    cancelButtonText: t.cancel
  }).then(result => {
    if (result.value) {
      store.dispatch({
        type: DELETE_EVENT,
        payload: { sched_id: eventClick.event._calendar.component.context.options.id, event_id: eventClick.event.id }
      })
      eventClick.event.remove(); // It will remove event from the calendar
      Alert.fire(t.deleted, t.the_event_has_been_deleted, "success");
    }
  });
};

//popup message to insert title for the calendar
export const enterNameSchedule = () => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title: t.enter_title_please,
    input: 'text',
    showCancelButton: true,
    cancelButtonColor: "#3085d6",
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    inputValidator: (result) => {
      if (!result)
        return t.you_must_insert_input;
    }
  }).then(result => {
    if (result.value)
      createCalendar(result.value)
  })
}

const renameSched = () => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title: t.enter_title_please,
    input: 'text',
    showCancelButton: true,
    cancelButtonColor: "#3085d6",
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    inputValidator: (result) => {
      if (!result)
        return t.you_must_insert_input;
    }
  }).then(result => {
    if (result.value) {
      store.dispatch({
        type: RENAME_SCHED,
        payload: result.value
      });
    }
  });
}

export const deleteAlert = schedule => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title: t.delete_schedule_title_part + schedule.title + '?',
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
  }).then(result => {
    if (result.value) {
      // It will remove schedule 
      deleteSchedule(schedule.id);
      Alert.fire(t.deleted, t.the_schedule_has_been_deleted, "success");
    }
  });
}

export const deleteSchedule = async(sched_id) => {
  try {
    const res = await axios.delete(`/api/schedules/${sched_id}`);
    popupAlert('Schedule deleted', res.data, 'regular');
  } catch (error) {
    console.error(error)
  };  
  store.dispatch({
    type: DELETE_SCHEDULE,
    payload: sched_id
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

  } else if (status === 'jaslsjlasdkjdaslasdjas') {
    chackOnServer();
  }


  return event;
}

export const changeLangScheds = () => {

  let old_scheds = store.getState().schedule.schedules;
  let new_scheds = {};

  for (let key in old_scheds) {
    new_scheds[old_scheds[key].id] = createCalendar(old_scheds[key].title, old_scheds[key].id, old_scheds[key].calendar.props.children.props.events, 0);
  }

  store.dispatch({
    type: CHANGE_LANG_SCHEDS,
    payload: new_scheds
  })

}