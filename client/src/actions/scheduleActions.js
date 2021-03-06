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
  STOP_LOADING_SCHED,
  EVENT_ERROR,
  GET_EVENTS,
  UPDATE_ERRORS_ARRAY,
  DELETE_FROM_ERRORS,
} from './types';
import Alert from 'sweetalert2';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import store from '../store';
import uuid from 'react-uuid';
import { popupAlert } from './alertsActions';
import { getUsers } from './userActions';
import { displayEventBySchedule } from './eventsActions';
import { sortEventByFirstLast } from './utilities';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export const cleanSchedules = () => {
  setLoading();
  store.dispatch({
    type: CLEAN_SCHEDULES,
  });
};
//get schedules from db
export const getSchedules = async () => {
  try {
    setLoading();
    const res = await axios.get('/api/schedules');
    let schedules = res.data;

    for (let i = 0; i < schedules.length; i++) {
      let convertEvents = [];
      //create the event obj
      for (let j = 0; j < schedules[i].events.length; j++) {
        let event = {
          schedId: schedules[i].sched_id,
          timeTableId: schedules[i].events[j].timeTableId._id,
          course_id: schedules[i].events[j].timeTableId.performance._id,
          eventId: schedules[i].events[j].eventId,
          title: schedules[i].events[j].timeTableId.performance.title,
          userid: schedules[i].events[j].timeTableId.user._id,
          id_number: schedules[i].events[j].timeTableId.user.id_number,
          serial_num: schedules[i].events[j].timeTableId.performance.serial_num,
          first_name: schedules[i].events[j].timeTableId.user.first_name,
          last_name: schedules[i].events[j].timeTableId.user.last_name,
          semester: schedules[i].events[j].timeTableId.performance.semester,
          location: schedules[i].events[j].timeTableId.performance.location,
          course_hours:
            schedules[i].events[j].timeTableId.performance.course_hours,
          year: schedules[i].events[j].timeTableId.performance.year,
          startTime: schedules[i].events[j].startTime,
          endTime: schedules[i].events[j].endTime,
          daysOfWeek: schedules[i].events[j].daysOfWeek,
          borderColor: 'black',
          color: schedules[i].events[j].timeTableId.user.color,
          textColor: 'white',
          errors: [],
        };
        convertEvents.push(event);
      }

      createCalendar(
        //create the schedule with the events afer thay converted
        schedules[i].title,
        schedules[i].year,
        schedules[i].location,
        schedules[i].semester,
        convertEvents,
        1,
        schedules[i].sched_id
      );
    }
    schedules = castToArray(store.getState().schedule.schedules);
    for (let i = 0; i < schedules.length; i++) {
      for (let j = 0; j < schedules[i].events.length; j++) {
        checkOnServer(schedules[i].events[j], false);
      }
    }
    sumAllCoursesHours();
    stopLoading();
  } catch (error) {
    console.error(error);
  }
};
//this method saved all schedules
export const saveAllSchedules = async () => {
  let scheds = store.getState().schedule.schedules;
  Object.keys(scheds).forEach(async function (id) {
    try {
      await axios.post('/api/schedules', {
        sched_id: scheds[id].id,
        title: scheds[id].title,
        events: scheds[id].calendar.props.children.props.events,
      });
    } catch (err) {
      console.log(err);
    }
  });
};
//this method saved one schedule on the db
const saveSchedule = async (
  sched_id,
  title,
  semester,
  year,
  location,
  events
) => {
  try {
    await axios.post('/api/schedules', {
      sched_id,
      title,
      semester,
      year,
      location,
      events,
    });
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
};

//create new schedule and push him to array
export const createCalendar = (
  title,
  year,
  location,
  semester,
  events = [],
  newSched = 1,
  id = uuid()
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
          // clear: {
          //   text: t.clear,
          //   click: function () {
          //     clearSchedule();
          //     saveButtonClicked();
          //     // exportTableToExcel()
          //   },
          // },
          export: {
            text: t.export,
            click: function () {
              exportSched();
            },
          },
        }}
        header={{
          center: '',
          left: '',
          right: 'clear export',
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
        eventDragStart={(e) => {
          showRightPlaces(e.event._def.extendedProps.timeTableId);
          showWrongPlaces(e.event._def.extendedProps.timeTableId);
          sumAllCoursesHours();
        }}
        eventDragStop={() => {
          deleteBackgroundEvents();
        }}
        eventDrop={function (info) {
          deleteBackgroundEvents();
          eventChanged(info, id);
          saveButtonClicked();
          sumAllCoursesHours();
        }}
        eventReceive={function (info) {
          addEvent(info, id);
          forceSchedsUpdate(id);
          saveButtonClicked();
          sumAllCoursesHours();
        }}
        eventResizeStart={(e) => {
          showRightPlaces(e.event._def.extendedProps.timeTableId);
          showWrongPlaces(e.event._def.extendedProps.timeTableId);
          sumAllCoursesHours();
        }}
        eventResize={function (info) {
          eventChanged(info, id);
          saveButtonClicked();
          sumAllCoursesHours();
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
    //if new schedule, adds the schedule on the state
    store.dispatch({
      type: CREATE_CALENDAR,
      payload: { calendar, title, id, semester, location, year, calendarRef },
    });
    sumAllCoursesHours();
  } else {
    //if we change the lang of the schedule
    return { calendar, title, id, semester, location, year, calendarRef };
  }
};
//when the user added events we refreshed the event for the validations
const refreshEvents = async () => {
  try {
    const res = await axios.get('/api/timetables');
    store.dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
    getUsers(); //update the users list
    sumAllCoursesHours(); //sum the courses again
  } catch (error) {
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.response.data,
    });
  }
};

//select calendar to display
export const selectCalendar = (id) => {
  store.dispatch({
    type: SELECT_CALENDAR,
    payload: id,
  });
  if (id !== null) {
    let schedule = store.getState().schedule.schedules[id];
    sumAllCoursesHours();
    displayEventBySchedule(
      schedule.year,
      schedule.semester,
      schedule.location,
      sortEventByFirstLast
    );
  }
};
//this method called when the user add new event to schedule
const addEvent = (info, id) => {
  //check if this legal action
  info.schedId = id;

  let event = createEventObj(info, id, 'create'); //create new event and than push it to the schedule
  //on the reducer
  //save on the shcedule array
  store.dispatch({
    type: ADD_EVENT,
    payload: {
      event: event,
      schedId: id,
    },
  });

  addEventOnTheUser(
    //add the event on the user performances
    event.startTime,
    event.endTime,
    event.userid,
    event.schedId,
    event.eventId,
    event.course_id,
    event.daysOfWeek,
    event.title,
    event.semester,
    event
  );
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

// const clearSchedule = () => {
//   let t = store.getState().literals.literals;
//   let id = store.getState().schedule.current;

//   Alert.fire({
//     title: t.delete_all_events_msg,
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: t.ok,
//     cancelButtonText: t.cancel,
//   }).then((result) => {
//     if (result.value) {
//       store.dispatch({
//         type: CLEAR_SCHEDULE,
//       });
//       forceSchedsUpdate(id);
//       saveButtonClicked();
//       sumAllCoursesHours();
//     }
//   });
// };

//popup window when the user clicking on the event into the calendar

//
export const eventClick = (eventClick) => {
  //this method popup message with info of the event and
  let t = store.getState().literals.literals; //with delete button
  let dir = store.getState().literals.dir;
  Alert.fire({
    title:
      eventClick.event.title +
      '<br>' +
      eventClick.event.extendedProps.first_name +
      ' ' +
      eventClick.event.extendedProps.last_name +
      `\n` +
      eventClick.event.extendedProps.serial_num,
    html: `<div class=${dir} >
        <h3 class='center-horizontaly'>${t.errors}</h3>
        <ul>
        </ul>
      </div>`,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.remove_event,
    cancelButtonText: t.cancel,
  }).then((result) => {
    if (result.value) {
      //if the user clicked on delete
      store.dispatch({
        type: DELETE_EVENT,
        payload: {
          sched_id: eventClick.event._calendar.component.context.options.id,
          event_id: eventClick.event._def.extendedProps.eventId,
        },
      });
      deleteFromErrors(eventClick.event._def.extendedProps.eventId);
      checkCollisionsAfterDelete(eventClick.event._def.extendedProps);
      forceSchedsUpdate(store.getState().schedule.current);
      sumAllCoursesHours();
      saveButtonClicked();
      Alert.fire(t.deleted, t.the_event_has_been_deleted, 'success');
      deleteEventOnTheUser(
        eventClick.event._def.extendedProps.userid,
        eventClick.event._def.extendedProps.eventId
      );
    }
  });
};

const checkCollisionsAfterDelete = async (event) => {
  let schedules = castToArray(store.getState().schedule.schedules);
  let errors = store.getState().schedule.errorsEvents;
  let events = store.getState().event.events;
  try {
    const res = await axios.put(`api/validations/delete/`, {
      schedules,
      errors,
      events,
      event,
    });
    updateStatus(res.data, true);
  } catch (err) {
    console.log(err);
  }
};

const deleteFromErrors = (eventId) => {
  store.dispatch({
    type: DELETE_FROM_ERRORS,
    payload: { eventId },
  });
};
//this method create the select element for location when we creats new schedule
const createLocationSelectElement = () => {
  let t = store.getState().literals.literals;
  let dir = store.getState().literals.dir;
  let adminObj = store.getState().admin;
  let htmlLocation =
    `<div>
      <div>${t.location}</div>` +
    `<select id="create-sched-location" class="swal2-input" dir=${dir} name="location">` +
    `<option className=${dir} defaultValue></option>`;
  adminObj.locations.map(
    (location) =>
      (htmlLocation += `<option className={props.dir} value='${location.name}'>${location.name}</option>`)
  );
  htmlLocation = htmlLocation + `</select ></div>`;

  var htmlObject = document.createElement('div');
  htmlObject.innerHTML = htmlLocation;
  htmlLocation = htmlObject.firstChild;

  return htmlLocation;
};
//this method create popup alert with fields to create new schedule
export const createSchdule = () => {
  let t = store.getState().literals.literals;
  let dir = store.getState().literals.dir;
  let htmlLocation = createLocationSelectElement();
  let createSchedAlert = {
    title: t.create_new_schedule,
    focusConfirm: false,
    html:
      htmlLocation.innerHTML + //field 2 - location (there is function that create this field)
      `<div>${t.year}</div>` + //field 3 - year
      `<select id="create-sched-year" class="swal2-input" dir=${dir}>
      <option class=${dir} defaultValue></option>
      <option class=${dir} value='a'>${t.a}</option>
      <option class=${dir} value='b'>${t.b}</option>
      <option class=${dir} value='c'>${t.c}</option>
      <option class=${dir} value='d'>${t.d}</option></select>` +
      `<div>${t.semester}</div>` + //field 4 - semester
      `<select id="create-sched-semester" class="swal2-input" dir=${dir}>
      <option class=${dir} defaultValue></option>
      <option class=${dir} value='a'>${t.a}</option>
      <option class=${dir} value='b'>${t.b}</option>
      <option class=${dir} value='yearly'>${t.yearly}</option>
      <option class=${dir} value='summer'>${t.summer}</option></select>`,
    showCancelButton: true,
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    preConfirm: () => ({
      //after the user click on confirm we taking the values
      title: 'schedule',
      year: document.getElementById('create-sched-year').value,
      semester: document.getElementById('create-sched-semester').value,
      location: document.getElementById('create-sched-location').value,
    }),
  };
  //this method popup alert the alert for create new schedule and checks if there is empty fields
  const createSched = async () => {
    const alertVal = await Alert.fire(createSchedAlert);
    let newSched = (alertVal && alertVal.value) || alertVal.dismiss;
    if (newSched && newSched !== 'cancel' && newSched !== 'esc') {
      if (
        newSched.title === '' ||
        newSched.location === '' ||
        newSched.semester === '' ||
        newSched.year === ''
      ) {
        await Alert.fire({ type: 'error', title: t.all_fields_are_required });
        createSched();
      } else {
        createCalendar(
          newSched.title,
          newSched.year,
          newSched.location,
          newSched.semester
        );
        let current = store.getState().schedule.current;
        let sched = store.getState().schedule.schedules[current];
        let events = sched.calendarRef.current.props.events;
        saveSchedule(
          sched.id,
          sched.title,
          sched.semester,
          sched.year,
          sched.location,
          events
        );
      }
    }
  };
  createSched();
};

//this method deletes event on the user and updates on the DB
const deleteEventOnTheUser = async (userId, eventId) => {
  try {
    await axios.put(`api/users/manage/performance/delete`, { userId, eventId });
    refreshEvents();
  } catch (err) {
    console.log(err);
  }
};
//this method adds event on the user and updates on the DB
const addEventOnTheUser = async (
  startTime,
  endTime,
  userId,
  schedId,
  eventId,
  performanceId,
  daysOfWeek,
  title,
  semester,
  event
) => {
  try {
    await axios.post('api/users/manage/performance', {
      startTime,
      endTime,
      userId,
      schedId,
      eventId,
      performanceId,
      daysOfWeek,
      title,
      semester,
    });
    refreshEvents();
    checkOnServer(event, true);
  } catch (err) {
    console.log(err);
  }
};

const updateEventOnTheUser = async (
  startTime,
  endTime,
  userId,
  eventId,
  daysOfWeek,
  event
) => {
  try {
    await axios.put('api/users/manage/performance', {
      startTime,
      endTime,
      userId,
      eventId,
      daysOfWeek,
    });
    refreshEvents();
    checkOnServer(event, true);
  } catch (err) {
    console.log(err);
  }
};

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

const exportSched = async () => {
  let t = store.getState().literals.literals;

  var toPrint = document.getElementById('calendar_print_area');
  html2canvas(toPrint).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('calendar.pdf');
  });

  // console.log(t);
  // try {
  //   await axios.post('/api/emails/manage/exportschedule');
  // } catch (err) {}
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
      deleteSchedule(schedule);
    }
  });
};

export const deleteSchedule = async (schedule) => {
  let t = store.getState().literals.literals;
  let msg = [];
  let events = schedule.calendar.props.children.props.events;

  try {
    // Delete all the events appear in schedule on all users personaly schedule
    for (let i = 0; i < events.length; i++) {
      deleteEventOnTheUser(events[i].userid, events[i].eventId);
    }
    const res = await axios.delete(`/api/schedules/manage/${schedule.id}`);
    msg.push(res.data);
    popupAlert('schedule_deleted', msg, 'regular');
    Alert.fire(t.deleted, t.the_schedule_has_been_deleted, 'success');
  } catch (error) {
    console.error(error);
  }
  store.dispatch({
    type: DELETE_SCHEDULE,
    payload: schedule.id,
  });
};

const eventChanged = (info, schedId) => {
  let event = createEventObj(info, schedId, 'change');
  store.dispatch({
    type: EVENT_CHANGED,
    payload: event,
  });

  updateEventOnTheUser(
    event.startTime,
    event.endTime,
    event.userid,
    event.eventId,
    event.daysOfWeek,
    event
  );
  forceSchedsUpdate(store.getState().schedule.current);
};

const checkOnServer = async (event, withMsg) => {
  let schedules = castToArray(store.getState().schedule.schedules);
  let errors = store.getState().schedule.errorsEvents;
  let events = store.getState().event.events;
  let users = store.getState().user.users;
  try {
    const res = await axios.post('/api/validations', {
      schedules,
      errors,
      events,
      users,
      event,
    });
    console.log(res.data);
    updateStatus(res.data, withMsg);
  } catch (error) {
    console.error(error);
  }
};

const getTimeFromEvent = (time) => {
  let minutes, hours;
  minutes =
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  hours =
    time.getUTCHours() < 10 ? '0' + time.getUTCHours() : time.getUTCHours();

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
      eventId: uuid(),
      timeTableId: info.draggedEl.getAttribute('timeTableId'),
      title: info.draggedEl.getAttribute('title'),
      id_number: info.draggedEl.getAttribute('id_number'),
      userid: info.draggedEl.getAttribute('userid'),
      course_id: info.draggedEl.getAttribute('course_id'),
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
      timeTableId: info.event._def.extendedProps.timeTableId,
      userid: info.event._def.extendedProps.userid,
      course_id: info.event._def.extendedProps.course_id,
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
  // sumAllCoursesHours();
};

const castToArray = (schedules) => {
  let schedsArray = [];
  for (let key in schedules) {
    schedsArray.push({
      title: schedules[key].title,
      id: schedules[key].id,
      semester: schedules[key].semester,
      year: schedules[key].year,
      location: schedules[key].location,
      events: schedules[key].calendar.props.children.props.events,
    });
  }

  return schedsArray;
};

const updateStatus = (res, withMsg) => {
  //update errors array
  store.dispatch({
    type: UPDATE_ERRORS_ARRAY,
    payload: res.errors,
  });

  for (let i = 0; i < res.errors.length; i++) {
    searchAndUpdateColor(
      res.errors[i].event.eventId,
      res.errors[i].event.schedId,
      'red'
    );
  }

  for (let i = 0; i < res.fixed_errors.length; i++) {
    let changeColor = true;
    for (let j = 0; j < res.errors.length; j++) {
      if (res.fixed_errors[i].event.eventId === res.errors[j].event.eventId) {
        changeColor = false;
        break;
      }
    }
    if (changeColor)
      searchAndUpdateColor(
        res.fixed_errors[i].event.eventId,
        res.fixed_errors[i].event.schedId,
        'black'
      );
  }

  forceSchedsUpdate(store.getState().schedule.current);

  if (res.popupMsg.popup && withMsg) {
    popupAlert('errors', res.popupMsg.errors, 'error');
  }
};

export const searchAndUpdateColor = (id, schedId, color) => {
  let schedules = store.getState().schedule.schedules;
  let length = schedules[schedId].calendar.props.children.props.events.length;

  for (let i = 0; i < length; i++) {
    if (
      schedules[schedId].calendar.props.children.props.events[i].eventId === id
    )
      schedules[schedId].calendar.props.children.props.events[
        i
      ].borderColor = color;
  }
};

export const showWrongPlaces = (id) => {
  let events = store.getState().event.events;
  let userPerformances = [];
  let calendar = store.getState().schedule.schedules[
    store.getState().schedule.current
  ].calendarRef;
  let semester = store.getState().schedule.schedules[
    store.getState().schedule.current
  ].semester;

  for (let i = 0; i < events.length; i++) {
    if (events[i]._id === id) {
      userPerformances = events[i].user.performances;
      break;
    }
  }
  userPerformances.forEach((event) => {
    if (event.semester === semester || semester === 'yearly') {
      calendar.current.calendar.addEvent({
        groupId: 'wrong',
        title: 'test',
        first_name: '',
        last_name: '',
        startTime: event.startTime,
        endTime: event.endTime,
        daysOfWeek: event.daysOfWeek,
        overlap: true,
        rendering: 'background',
        color: '#ff596e',
      });
    }
  });
};

export const showRightPlaces = (id) => {
  let events = store.getState().event.events;
  let userConstraints;
  let semester;

  for (let i = 0; i < events.length; i++) {
    if (events[i]._id === id) {
      userConstraints = events[i].user.constraints;
      semester = events[i].performance.semester;
      break;
    }
  }
  if (semester === 'a') {
    semester = 'semesterA';
  } else if (semester === 'b') {
    semester = 'semesterB';
  } else if (semester === 'summer') {
    semester = 'semesterC';
  }
  if (userConstraints === undefined) return;

  let sunday = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: userConstraints[semester].sunday_start,
    endTime: userConstraints[semester].sunday_end,
    daysOfWeek: [0],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };
  let monday = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: userConstraints[semester].monday_start,
    endTime: userConstraints[semester].monday_end,
    daysOfWeek: [1],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };
  let tuesday = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: userConstraints[semester].tuesday_start,
    endTime: userConstraints[semester].tuesday_end,
    daysOfWeek: [2],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };
  let wednesday = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: userConstraints[semester].wednesday_start,
    endTime: userConstraints[semester].wednesday_end,
    daysOfWeek: [3],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };
  let thursday = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: userConstraints[semester].thursday_start,
    endTime: userConstraints[semester].thursday_end,
    daysOfWeek: [4],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };
  let friday = {
    groupId: 'good',
    title: 'test',
    first_name: '',
    last_name: '',
    startTime: userConstraints[semester].friday_start,
    endTime: userConstraints[semester].friday_end,
    daysOfWeek: [5],
    overlap: true,
    rendering: 'background',
    color: '#257e4a',
  };

  let calendar = store.getState().schedule.schedules[
    store.getState().schedule.current
  ].calendarRef;

  if (userConstraints[semester].sunday_start)
    calendar.current.calendar.addEvent(sunday);
  if (userConstraints[semester].monday_start)
    calendar.current.calendar.addEvent(monday);
  if (userConstraints[semester].tuesday_start)
    calendar.current.calendar.addEvent(tuesday);
  if (userConstraints[semester].wednesday_start)
    calendar.current.calendar.addEvent(wednesday);
  if (userConstraints[semester].thursday_start)
    calendar.current.calendar.addEvent(thursday);
  if (userConstraints[semester].friday_start)
    calendar.current.calendar.addEvent(friday);
};

export const deleteBackgroundEvents = () => {
  let calendar = store.getState().schedule.schedules[
    store.getState().schedule.current
  ].calendarRef;
  let events = calendar.current.props.events;
  let newEvents = [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].groupId !== 'good' || events[i].groupId !== 'wrong')
      newEvents.push(events[i]);
  }
  calendar.current.calendar.removeAllEvents();
  calendar.current.calendar.addEventSource(newEvents);
};

export const sumAllCoursesHours = () => {
  let schedule = store.getState().schedule.schedules[
    store.getState().schedule.current
  ];
  if (schedule) {
    let events = store.getState().event.events;
    let schedEvents = schedule.calendar.props.children.props.events;

    events.forEach((event) => {
      event.course_hours_remaining = event.performance.course_hours;
    });

    for (let i = 0; i < schedEvents.length; i++) {
      let timeTableId = schedEvents[i].timeTableId;
      let total_remaining;
      events.forEach((event) => {
        if (event._id === timeTableId)
          total_remaining = event.course_hours_remaining;
      });

      let totalMinutes = calculateDiffBetweenTimes(
        schedEvents[i].startTime,
        schedEvents[i].endTime
      );
      let timeStamp = minutesToTimeStamp(
        calculateDiffBetweenTimes(
          minutesToTimeStamp(totalMinutes),
          total_remaining
        )
      );

      store.dispatch({
        type: 'UPDATE_HOURS_REMAINING',
        payload: { timeStamp, timeTableId },
      });
    }
    displayEventBySchedule(
      schedule.year,
      schedule.semester,
      schedule.location,
      sortEventByFirstLast
    );
  }
};

//this method gets 2 strings of time stamp and return the differance in minutes (int)
const calculateDiffBetweenTimes = (start, end) => {
  start = start.split(':');
  end = end.split(':');
  let diffHours = parseInt(end[0]) - parseInt(start[0]);
  start = parseInt(start[0] + start[1]);
  end = parseInt(end[0] + end[1]);

  let totalMinutes = end - start - diffHours * 40;

  return totalMinutes;
};
//this method gets minutes (int) and convert to time stamp (string)
const minutesToTimeStamp = (totalMinutes) => {
  let timeStamp = '';
  let minutes;
  let hours;

  if (totalMinutes < 0) {
    totalMinutes = Math.abs(totalMinutes);
    timeStamp = '-';
  }
  minutes = totalMinutes % 60;
  hours = parseInt(totalMinutes / 60);

  minutes < 10 ? (minutes = '0' + minutes) : (minutes = minutes.toString());
  hours < 10 ? (hours = '0' + hours) : (hours = hours.toString());
  timeStamp += hours + ':' + minutes;

  return timeStamp;
};
//this method popup alert with the schedule of the user
export const createScheduleAlert = (user, semester) => {
  let schedule = createScheduleForUser(user, semester);
  let t = store.getState().literals.literals;
  Alert.fire({
    title:
      user.first_name +
      ' ' +
      user.last_name +
      '\n' +
      t.semester +
      ' ' +
      t[semester],
    html: `<div id='sched-of-user'></div>`,
    width: '1000px',
    confirmButtonText: t.ok,
  });
  //for the events will be in the right places
  setTimeout(renderSchedule, 500);

  function renderSchedule() {
    ReactDOM.render(schedule, document.getElementById('sched-of-user'));
  }
};
//sub function that return the schdule of the user for the alert
const createScheduleForUser = (user, semester) => {
  let events = getEventsForUser(user, semester);
  let schedule = (
    <div id='calendar-alert'>
      <FullCalendar
        defaultView='timeGridWeek'
        header={{
          center: '',
          left: '',
          right: '',
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        hiddenDays={[6]}
        allDaySlot={false}
        slotDuration='00:30:00'
        snapDuration='00:05:00'
        minTime='07:00:00'
        maxTime='23:00:00'
        height='auto'
        titleFormat={{ weekday: 'long' }}
        columnHeaderFormat={{ weekday: 'long' }}
        selectable={false}
        selectHelper={false}
        editable={false}
        droppable={false}
        eventLimit={false}
        events={events}
        locale={store.getState().literals.lang}
        dir={store.getState().literals.dir}
      />
    </div>
  );

  return schedule;
};
//this method search the user from the users and push the events of the user to array
const getEventsForUser = (user, semester) => {
  let users = store.getState().user.users;
  let userEvents;
  users.forEach((userToCheck) => {
    if (userToCheck._id === user._id) {
      userEvents = userToCheck.performances;
    }
  });

  let events = [];
  userEvents.forEach((event) => {
    if (event.semester === semester)
      events.push({
        title: event.title,
        startTime: event.startTime,
        endTime: event.endTime,
        daysOfWeek: event.daysOfWeek,
      });
  });
  return events;
};
