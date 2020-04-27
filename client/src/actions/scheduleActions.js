import {
  SET_LOADING_SCHED,
  CREATE_CALENDAR,
  SELECT_CALENDAR,
  DELETE_SCHEDULE,
  ADD_EVENT,
  DELETE_EVENT,
  EVENT_CHANGED,
  CHANGE_LANG_SCHEDS,
  RENAME_SCHED,
  CLEAN_SCHEDULES,
  CLEAR_SCHEDULE,
  STOP_LOADING_SCHED
} from './types';
import Alert from 'sweetalert2';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import axios from 'axios';
import store from '../store';
import uuid from 'react-uuid';
import { popupAlert } from './alertsActions';
import { updateEventsFromDB } from './eventsActions';
import { getUsers } from './userActions';

//import thunk from 'redux-thunk'
//get schedules from db

export const cleanSchedules = () => {
  setLoading();
  store.dispatch({
    type: CLEAN_SCHEDULES
  });
}

export const getSchedules = async () => {
  try {
    setLoading();
    const res = await axios.get('/api/schedules');
    let schedules = res.data;

    for (let i = 0; i < schedules.length; i++) {
      let convertEvents = [];

      for (let j = 0; j < schedules[i].events.length; j++) {
        let event = {
          sched_id: schedules[i].sched_id,
          timeTableId: schedules[i].events[j].timeTableId._id,
          eventId: uuid(),
          title: schedules[i].events[j].timeTableId.performance.title,
          id_number: schedules[i].events[j].timeTableId.user.id_number,
          serial_num: schedules[i].events[j].timeTableId.performance.serial_num,
          first_name: schedules[i].events[j].timeTableId.user.first_name,
          last_name: schedules[i].events[j].timeTableId.user.last_name,
          semester: schedules[i].events[j].timeTableId.performance.semester,
          location: schedules[i].events[j].timeTableId.performance.location,
          course_hours: schedules[i].events[j].timeTableId.performance.course_hours,
          year: schedules[i].events[j].timeTableId.performance.year,
          startTime: schedules[i].events[j].startTime,
          endTime: schedules[i].events[j].endTime,
          daysOfWeek: schedules[i].events[j].daysOfWeek,
          borderColor: 'black',
          color: schedules[i].events[j].timeTableId.user.color,
          textColor: 'white',
        };
        convertEvents.push(event);
      }

      createCalendar(
        schedules[i].title,
        schedules[i].year,
        schedules[i].location,
        schedules[i].semester,
        convertEvents,
        1,
        schedules[i].sched_id
      );
    }
    stopLoading();
  } catch (error) {
    console.error(error);
  }
};

export const saveAllSchedules = async () => {
  let scheds = store.getState().schedule.schedules;
  Object.keys(scheds).forEach(async function (id) {
    try {
      await axios.post('/api/schedules', {
        sched_id: scheds[id].id,
        title: scheds[id].title,
        events: scheds[id].calendar.props.children.props.events
      });
    } catch (err) {
      console.log(err);
    }
  });
}

const saveSchedule = async (sched_id, title, semester, year, location, events) => {
  try {
    await axios.post('/api/schedules', { sched_id, title, semester, year, location, events });
    // popupAlert('congratulations', res.data, 'regular');
  } catch (error) {
    console.error(error);
  }
};
//set loading to true
export const setLoading = () => {
  store.dispatch({
    type: SET_LOADING_SCHED,
  });
};

const stopLoading = () => {
  store.dispatch({
    type: STOP_LOADING_SCHED,
  });
}

//create new schedule and push him to array
export const createCalendar = (
  title,
  year,
  location,
  semester,
  events = [],
  newSched = 1,
  id = uuid(),
) => {
  let t = store.getState().literals.literals;
  let calendarRef = React.createRef();
  let calendar = (
    <div className='calendar' id='fullcalendar'>
      <FullCalendar
        ref={calendarRef}
        id={id}
        defaultView='timeGridWeek'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        customButtons={{
          save: {
            text: t.clear,
            click: function () {
              clearSchedule();
              saveButtonClicked();
            },
          },
          rename: {
            text: t.rename,
            click: function () {
              // renameSched();
              sumAllCoursesHours();
            },
          },
        }}
        header={{
          center: '',
          left: '',
          right: 'save rename',
        }}
        hiddenDays={[6]}
        allDaySlot={false}
        slotDuration='00:30:00'
        snapDuration='00:05:00'
        minTime='07:00:00'
        height='auto'
        titleFormat={{ weekday: 'long' }}
        columnHeaderFormat={{ weekday: 'long' }}
        selectable={true}
        selectHelper={true}
        editable={true}
        droppable={true}
        eventDragStart={() => { showRightPlaces() }}
        eventDrop={function (info) {
          deleteRightPlaces();
          eventChanged(info, id);
        }}
        eventReceive={function (info) {
          addEvent(info, id);
          forceSchedsUpdate(id);
        }}
        eventResizeStart={() => { showRightPlaces() }}
        eventResize={function (info) {
          eventChanged(info, id);
        }}
        eventLimit={true}
        eventRender={function (info) {
          info.el.append(
            info.event.extendedProps.first_name +
            ' ' +
            info.event.extendedProps.last_name
          );
        }}
        eventClick={eventClick}
        events={events}
        locale={store.getState().literals.lang}
        dir={store.getState().literals.dir}
      />
    </div>
  );
  if (newSched) {
    store.dispatch({
      type: CREATE_CALENDAR,
      payload: { calendar, title, id, semester, location, year, calendarRef },
    });
  } else {
    return { calendar, title, id, semester, location, year, calendarRef };
  }
};
//select calendar to display
export const selectCalendar = (id) => {
  store.dispatch({
    type: SELECT_CALENDAR,
    payload: id,
  });
};

const addEvent = (info, id) => {
  //check if this legal action
  info.schedId = id;
  let eventId = uuid();
  info.draggedEl.id = eventId;

  let event = createEventObj(info, id, 'create');
  //save on the shcedule array
  store.dispatch({
    type: ADD_EVENT,
    payload: {
      event: event,
      schedId: id,
    },
  });

  checkOnServer(event);
};
//this method works when the user clicks on the save button
const saveButtonClicked = () => {
  let current = store.getState().schedule.current;
  let schedule = store.getState().schedule.schedules[current];
  saveSchedule(
    schedule.id,
    schedule.title,
    schedule.semester,
    schedule.year,
    schedule.location,
    schedule.calendarRef.current.props.events
  );
};

const clearSchedule = () => {
  let t = store.getState().literals.literals;
  let id = store.getState().schedule.current;

  Alert.fire({
    title: t.delete_all_events_msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel
  }).then((result) => {
    if (result.value) {
      store.dispatch({
        type: CLEAR_SCHEDULE,
      });
      forceSchedsUpdate(id)
      saveButtonClicked();
    }
  })
}

//popup window when the user clicking on the event into the calendar
export const eventClick = (eventClick) => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title:
      eventClick.event.title +
      '<br>' +
      eventClick.event.extendedProps.first_name +
      ' ' +
      eventClick.event.extendedProps.last_name +
      '\n SN: ' +
      eventClick.event.extendedProps.serial_num,
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
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.remove_event,
    cancelButtonText: t.cancel,
  }).then((result) => {
    if (result.value) {
      store.dispatch({
        type: DELETE_EVENT,
        payload: {
          sched_id: eventClick.event._calendar.component.context.options.id,
          event_id: eventClick.event._def.extendedProps.eventId,
        }
      });
      forceSchedsUpdate(store.getState().schedule.current);
      saveButtonClicked();
      Alert.fire(t.deleted, t.the_event_has_been_deleted, 'success');
    }
  });
};

const createLocationSelectElement = () => {
  let t = store.getState().literals.literals;
  let dir = store.getState().literals.dir;
  let adminObj = store.getState().admin;
  let htmlLocation =
    `<div>
      <div>${t.location}</div>` +
    `<select id="create-sched-location" class="swal2-input" dir=${dir} name="location">` +
    `<option className=${dir} defaultValue></option>`;
  adminObj.locations.map(location => (
    htmlLocation += (`<option className={props.dir} value='${location.name}'>${location.name}</option>`)));
  htmlLocation = htmlLocation + `</select ></div>`;

  var htmlObject = document.createElement('div');
  htmlObject.innerHTML = htmlLocation;
  htmlLocation = htmlObject.firstChild;

  return htmlLocation;
}

export const createSchdule = () => {
  let t = store.getState().literals.literals;
  let dir = store.getState().literals.dir;
  let htmlLocation = createLocationSelectElement()
  let createSchedAlert = {
    title: t.create_new_schedule,
    focusConfirm: false,
    html:
      `<div>${t.enter_title_please}</div>` +
      `<input id="create-sched-title" class="swal2-input">` +
      htmlLocation.innerHTML +
      `<div>${t.year}</div>` +
      `<select id="create-sched-year" class="swal2-input" dir=${dir}>
      <option class=${dir} defaultValue></option>
      <option class=${dir} value='a'>${t.a}</option>
      <option class=${dir} value='b'>${t.b}</option>
      <option class=${dir} value='c'>${t.c}</option>
      <option class=${dir} value='d'>${t.d}</option></select>` +
      `<div>${t.semester}</div>` +
      `<select id="create-sched-semester" class="swal2-input" dir=${dir}>
      <option class=${dir} defaultValue></option>
      <option class=${dir} value='a'>${t.a}</option>
      <option class=${dir} value='b'>${t.b}</option>
      <option class=${dir} value='yearly'>${t.yearly}</option>
      <option class=${dir} value='summer'>${t.summer}</option></select>`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    preConfirm: () => ({
      title: document.getElementById('create-sched-title').value,
      year: document.getElementById('create-sched-year').value,
      semester: document.getElementById('create-sched-semester').value,
      location: document.getElementById('create-sched-location').value
    }),
  };
  const createSched = async () => {
    const alertVal = await Alert.fire(createSchedAlert);
    let newSched = (alertVal && alertVal.value) || alertVal.dismiss;
    if ((newSched && newSched !== 'cancel')) {
      if (newSched.title === '' ||
        newSched.location === ''
        || newSched.semester === ''
        || newSched.year === '') {
        await Alert.fire({ type: 'error', title: t.all_fields_are_required });
        createSched();
      } else {
        createCalendar(newSched.title, newSched.year, newSched.location, newSched.semester);
        let current = store.getState().schedule.current;
        let sched = store.getState().schedule.schedules[current];
        let events = sched.calendarRef.current.props.events
        saveSchedule(sched.id, sched.title, sched.semester, sched.year, sched.location, events)
      }
    }
  }
  createSched();

}

//popup message to insert title for the calendar
export const enterNameSchedule = () => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title: t.enter_title_please,
    input: 'text',
    showCancelButton: true,
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    inputValidator: (result) => {
      if (!result) return t.you_must_insert_input;
    },
  }).then((result) => {
    if (result.value) createCalendar(result.value);
  });
};

const renameSched = () => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title: t.enter_title_please,
    input: 'text',
    showCancelButton: true,
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    inputValidator: (result) => {
      if (!result) return t.you_must_insert_input;
    },
  }).then((result) => {
    if (result.value) {
      store.dispatch({
        type: RENAME_SCHED,
        payload: result.value,
      });
    }
  });
};

export const deleteAlert = (schedule) => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title: t.delete_schedule_title_part + schedule.title + '?',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
  }).then((result) => {
    if (result.value) {
      // It will remove schedule
      deleteSchedule(schedule.id);
      Alert.fire(t.deleted, t.the_schedule_has_been_deleted, 'success');
    }
  });
};

export const deleteSchedule = async (sched_id) => {
  try {
    const res = await axios.delete(`/api/schedules/manage/${sched_id}`);
    popupAlert('schedule_deleted', res.data, 'regular');
  } catch (error) {
    console.error(error);
  }
  store.dispatch({
    type: DELETE_SCHEDULE,
    payload: sched_id,
  });
};

const eventChanged = (info, schedId) => {
  let event = createEventObj(info, schedId, 'change');

  store.dispatch({
    type: EVENT_CHANGED,
    payload: event,
  });

  checkOnServer(event);
  forceSchedsUpdate(store.getState().schedule.current);
};

const checkOnServer = async (event) => {
  let schedules = castToArray(store.getState().schedule.schedules);
  try {
    const res = await axios.post('/api/validations', { event, schedules });
    if (res.data.event1 !== undefined && res.data.event2 !== undefined)
      updateStatus(res.data);
  } catch (error) {
    console.error(error);
  }
};

const getTimeFromEvent = (time) => {
  let minutes, hours;
  minutes =
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  hours =
    time.getUTCHours() < 10
      ? '0' + (time.getUTCHours())
      : time.getUTCHours();

  return hours + ':' + minutes;
};

export const forceSchedsUpdate = (id) => {
  var t = window.scrollY;
  selectCalendar(null);
  selectCalendar(id);
  window.scrollTo(0, t);
};

const createEventObj = (info, schedId, status) => {
  let event;
  if (status === 'create') {
    event = {
      schedId,
      eventId: info.event._def.publicId,
      timeTableId: info.draggedEl.getAttribute('timeTableId'),
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
      daysOfWeek: [info.event._instance.range.start.getUTCDay()],
      borderColor: 'black',
      color: info.draggedEl.getAttribute('backgroundcolor'),
      textColor: 'white',
    };
  } else if (status === 'change') {
    let start = getTimeFromEvent(info.event._instance.range.start);
    start < '07:00'
      ? (start = '07:00')
      : (start = getTimeFromEvent(info.event._instance.range.start));
    event = {
      schedId,
      eventId: info.event._def.extendedProps.eventId,
      title: info.event._def.title,
      timetableid: info.event._def.extendedProps.timetableid,
      id_number: info.event._def.extendedProps.id_number,
      serial_num: info.event._def.extendedProps.serial_num,
      first_name: info.event._def.extendedProps.first_name,
      last_name: info.event._def.extendedProps.last_name,
      semester: info.event._def.extendedProps.semester,
      course_hours: info.event._def.extendedProps.course_hours,
      year: info.event._def.extendedProps.year,
      location: info.event._def.extendedProps.location,
      startTime: start,
      endTime: getTimeFromEvent(info.event._instance.range.end),
      daysOfWeek: [info.event._instance.range.start.getUTCDay()],
      borderColor: 'black',
      color: info.event._def.extendedProps.backgroundColor,
      textColor: 'white',
    };
  }

  return event;
};

export const changeLangScheds = () => {
  let old_scheds = store.getState().schedule.schedules;
  let new_scheds = {};
  for (let key in old_scheds) {
    new_scheds[old_scheds[key].id] = createCalendar(
      old_scheds[key].title,
      old_scheds[key].year,
      old_scheds[key].location,
      old_scheds[key].semester,
      old_scheds[key].calendar.props.children.props.events,
      0,
      old_scheds[key].id

    );
  }

  store.dispatch({
    type: CHANGE_LANG_SCHEDS,
    payload: new_scheds,
  });

};

const castToArray = (schedules) => {
  let schedsArray = [];
  for (let key in schedules) {
    schedsArray.push({
      title: schedules[key].title,
      id: schedules[key].id,
      events: schedules[key].calendar.props.children.props.events,
    });
  }

  return schedsArray;
};

const updateStatus = (res) => {
  if (res.type === 'error' || res.type === 'warning') {
    popupAlert(res.type, res.msg, res.type);

    //update events
    store.dispatch({
      type: 'UPDATE_EVENT',
      payload: {
        color: 'red',
        id1: res.event1.eventId,
        id2: res.event2.eventId,
        sched1Id: res.sched1Id,
        sched2Id: res.sched2Id,
      },
    });
  } else {
    store.dispatch({
      type: 'UPDATE_EVENT',
      payload: {
        color: '',
        id1: res.event1.eventId,
        id2: res.event1.eventId,
        sched1Id: res.sched1Id,
        sched2Id: res.sched1Id,
      },
    });
  }
  forceSchedsUpdate(store.getState().schedule.current);
};

export const searchAndUpdate = (state, id, schedId, color) => {
  let length =
    state.schedules[schedId].calendar.props.children.props.events.length;
  for (let i = 0; i < length; i++) {
    if (
      state.schedules[schedId].calendar.props.children.props.events[i]
        .eventId === id
    )
      state.schedules[schedId].calendar.props.children.props.events[
        i
      ].borderColor = color;
  }
};

export const showRightPlaces = () => {
  let event = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: '14:00',
    endTime: '19:00',
    daysOfWeek: [1],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };
  let event2 = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: '08:00',
    endTime: '14:00',
    daysOfWeek: [2],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };
  let event3 = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: '08:00',
    endTime: '16:00',
    daysOfWeek: [3],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };

  let calendar = store.getState().schedule.schedules[store.getState().schedule.current].calendarRef;
  calendar.current.calendar.addEvent(event2);
  calendar.current.calendar.addEvent(event3);
  calendar.current.calendar.addEvent(event);
}

export const deleteRightPlaces = () => {
  let calendar = store.getState().schedule.schedules[store.getState().schedule.current].calendarRef;
  let events = calendar.current.props.events;
  let newEvents = []
  for (let i = 0; i < events.length; i++) {
    if (events[i].groupId !== "good")
      newEvents.push(events[i])
  }
  calendar.current.calendar.removeAllEvents();
  calendar.current.calendar.addEventSource(newEvents);
}

export const sumAllCoursesHours = () => {
  //sched_id + event_id + start + end + day
  saveButtonClicked();
  let events = store.getState().event.events;
  let schedule = store.getState().schedule.schedules[store.getState().schedule.current];
  console.log(schedule.calendar.props.children.props.events);
  let schedEvents = schedule.calendar.props.children.props.events;
  events.forEach((event) => { event.course_hours_remaining = event.performance.course_hours });
  for (let i = 0; i < schedEvents.length; i++) {
    let timeTableId = schedEvents[i].timeTableId;
    let total_remaining;
    events.forEach((event) => {
      if (event._id === timeTableId)
        total_remaining = event.course_hours_remaining;
    })
    let totalMinutes = calculateDiffBetweenTimes(schedEvents[i].startTime, schedEvents[i].endTime);
    let timeStamp = minutesToTimeStamp(calculateDiffBetweenTimes(minutesToTimeStamp(totalMinutes), total_remaining));

    store.dispatch({
      type: "UPDATE_HOURS_REMAINING",
      payload: { timeStamp, timeTableId }
    })


  }
}


const calculateDiffBetweenTimes = (start, end) => {
  start = start.split(':');
  end = end.split(':');
  let diffHours = parseInt(end[0]) - parseInt(start[0]);
  start = parseInt(start[0] + start[1]);
  end = parseInt(end[0] + end[1]);

  let totalMinutes = (end - start) - diffHours * 40;

  return totalMinutes;
}

const minutesToTimeStamp = (totalMinutes) => {
  let timeStamp = (parseInt(totalMinutes / 60)).toString() + ':' + (totalMinutes % 60).toString();
  let minutes = totalMinutes % 60;
  let hours = parseInt(totalMinutes / 60);

  minutes < 10 ? minutes = '0' + minutes : minutes = minutes.toString();
  hours < 10 ? hours = '0' + hours : hours = hours.toString();
  timeStamp = hours + ':' + minutes;
  return timeStamp;
}