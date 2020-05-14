import { GET_EVENTS, EVENT_ERROR, SET_LOADING, REGISTER_FAIL, GET_COURSES, FILTER_EVENTS_BY_LOCATION, FILTER_EVENTS_BY_SEMESTER, FILTER_EVENTS_BY_YEAR, FILTER_EVENTS_BY_COURSE_TITLE, FILTER_EVENTS_BY_LAST_NAME, FILTER_EVENTS_BY_FIRST_NAME, DISPLAY_ALL_EVENTS } from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
import { displayAlert } from './authActions';
import {
  cleanSchedules,
  getSchedules,
  saveAllSchedules,
  createScheduleAlert
} from './scheduleActions';
import Alert from 'sweetalert2';
import $ from 'jquery';

// Get events form DataBase
export const getEvents = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/timetables');
    store.dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (error) {
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.response.data,
    });
  }
};

export const updateEventsFromDB = async () => {
  try {
    const res = await axios.get('/api/timetables');
    store.dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (error) {
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.response.data,
    });
  }
}

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING,
  });
};
// Create new course
export const createCourse = async (FormData) => {
  try {
    const res = await axios.post('/api/performances/manage', FormData);
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data,
    });
    displayAlert();
  }
};
// Get all courses
export const getCourses = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/performances/manage');
    store.dispatch({
      type: GET_COURSES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const toggleSelection = (newId, oldId) => {
  if (newId) {
    document.getElementById(newId).style.backgroundColor = '#00adff42';
    if (oldId) {
      document.getElementById(oldId).style.backgroundColor = '';
    }
  }
};

export const createEvent = async (userId, courseId) => {
  if (userId === '' && courseId === '') {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: 'select_user_and_course',
    });
    displayAlert();
  } else if (userId === '') {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: 'select_user',
    });
    displayAlert();
  } else if (courseId === '') {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: 'select_course',
    });
    displayAlert();
  } else {
    let form = { userId, courseId, group_name: '' };
    try {
      const res = await axios.post('/api/timetables', form);
      popupAlert('congratulations', res.data, 'regular');
    } catch (err) {
      store.dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
      console.log(err);
      displayAlert();
    }
  }
};

export const getCourseById = (id) => {
  let courses = store.getState().event.courses;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i]._id === id) {
      return courses[i];
    }
  }
};

export const updateCourse = async (course) => {
  try {
    saveAllSchedules();
    const res = await axios.put(`/api/performances/${course._id}`, course);
    getCourses();
    cleanSchedules();
    getSchedules();
    popupAlert('congratulations', res.data.msg, 'regular');
  } catch (err) {
    console.error(err);
  }
};

export const deleteCourseAlert = (course) => {
  let t = store.getState().literals;
  Alert.fire({
    title: t.literals.delete_schedule_title_part,
    html:
      `<div className=${t.dir}>${t.literals.course_title}: ${course.title}</div>` +
      `<div className=${t.dir}>${t.literals.serial_number}: ${course.serial_num}</div>`,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel,
  }).then((result) => {
    if (result.value) {
      // It will remove user
      deleteCourse(course._id);
    }
  });
};

const deleteCourse = async (id) => {
  let t = store.getState().literals;
  try {
    saveAllSchedules();
    await axios.delete(`/api/performances/${id}`);
    getCourses();
    cleanSchedules();
    getSchedules();
    Alert.fire(
      t.literals.deleted,
      t.literals.the_course_has_been_deleted,
      'success'
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteEventAlert = event => {
  let t = store.getState().literals;
  Alert.fire({
    title: t.literals.delete_schedule_title_part,
    html:
      `<div className=${t.dir}>${t.literals.course_title}: ${event.performance.title}</div>` +
      `<div className=${t.dir}>${t.literals.name}: ${event.user.first_name} ${event.user.last_name}</div>`,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel
  }).then(result => {
    if (result.value) {
      // It will remove user
      deleteEvent(event._id);
    }
  });
};

const deleteEvent = async id => {
  let t = store.getState().literals;
  try {
    saveAllSchedules();
    await axios.delete(`/api/timetables/${id}`);
    getEvents();
    cleanSchedules();
    getSchedules();
    Alert.fire(
      t.literals.deleted,
      t.literals.the_event_has_been_deleted,
      'success'
    );
  } catch (err) {
    console.log(err);
  }
};

export const filterEvents = (search) => {
  console.log(search)
  store.dispatch({
    type: DISPLAY_ALL_EVENTS,
  });
  switch (search.type) {
    case 'first_name':
      store.dispatch({
        type: FILTER_EVENTS_BY_FIRST_NAME,
        payload: search.text
      });
      break;
    case 'last_name':
      store.dispatch({
        type: FILTER_EVENTS_BY_LAST_NAME,
        payload: search.text
      });
      break;
    case 'course_title':
      store.dispatch({
        type: FILTER_EVENTS_BY_COURSE_TITLE,
        payload: search.text
      });
      break;
    case 'year':
      store.dispatch({
        type: FILTER_EVENTS_BY_YEAR,
        payload: search.year
      });
      console.log(search.year)
      break;
    case 'semester':
      store.dispatch({
        type: FILTER_EVENTS_BY_SEMESTER,
        payload: search.semester
      });
      break;
    case 'location':
      store.dispatch({
        type: FILTER_EVENTS_BY_LOCATION,
        payload: search.location
      });
      break;
    default:
      break;
  }
}

export const getUserDetailsAlert = (user, course) => {
  let semester;
  if (course.semester === 'a') {
    semester = 'semesterA'
  } else if (course.semester === 'b') {
    semester = 'semesterB'
  } else if (course.semester === 'summer') {
    semester = 'semesterC'
  }
  let t = store.getState().literals.literals;
  let dir = store.getState().literals.dir;
  Alert.fire({
    title:
      user.first_name + ' ' + user.last_name,
    html:
      `<div class="table-responsive">
      <table class="table">
       <tbody class=${dir}>
        <tr>
         <td><div>${t.sunday}: ${user.constraints[semester].sunday_start} - ${user.constraints[semester].sunday_end}</div>
         <div> ${t.notes}: ${user.constraints[semester].sunday_notes}</div></td>
        </tr>
        <tr>
         <td><div>${t.monday}: ${user.constraints[semester].monday_start} - ${user.constraints[semester].monday_end}</div>
         <div> ${t.notes}: ${user.constraints[semester].monday_notes}</div></td>
        </tr>
        <tr>
         <td><div>${t.tuesday}: ${user.constraints[semester].tuesday_start} - ${user.constraints[semester].tuesday_end}</div>
         <div> ${t.notes}: ${user.constraints[semester].tuesday_notes}</div></td>
        </tr>
        <tr>
         <td><div>${t.wednesday}: ${user.constraints[semester].wednesday_start} - ${user.constraints[semester].wednesday_end}</div>
         <div> ${t.notes}: ${user.constraints[semester].wednesday_notes}</div></td>
        </tr>
        <tr>
         <td><div>${t.thursday}: ${user.constraints[semester].thursday_start} - ${user.constraints[semester].thursday_end}</div>
         <div> ${t.notes}: ${user.constraints[semester].thursday_notes}</div></td>
        </tr>
        <tr>
         <td><div>${t.friday}: ${user.constraints[semester].friday_start} - ${user.constraints[semester].friday_end}</div>
         <div> ${t.notes}: ${user.constraints[semester].friday_notes}</div></td>
        </tr>
        <tr>
        <td><div>${t.hours_per_course}:</div>
        <div>${user.constraints[semester].course_comments}</div></td>
       </tr>
        <tr>
        <td><div>${t.general_comments}:</div>
        <div>${user.constraints[semester].general_comments}</div></td>
       </tr>
       <tr>
       <td class='red-text'><div>${t.critical_comments}:</div>
       <div>${user.constraints[semester].critical_comments}</div></td>
      </tr>
      </tbody>
      </table>
      </div>
      <div class=${dir}>${t.show_schedule}</divclass=>
      <div id=${course._id + user._id + '-a'} class='clickable ${dir}'>${t.semester} ${t.a}</div>
      <div id=${course._id + user._id + '-b'} class='clickable ${dir}'>${t.semester} ${t.b}</div>
      <div id=${course._id + user._id + '-c'} class='clickable ${dir}'>${t.semester} ${t.summer}</div>`,
    confirmButtonText: t.ok,
  })

  $(document).on('click', '#' + course._id + user._id + '-a', function () {
    createScheduleAlert(user, 'a')
  })
  $(document).on('click', '#' + course._id + user._id + '-b', function () {
    createScheduleAlert(user, 'b')
  })
  $(document).on('click', '#' + course._id + user._id + '-c', function () {
    createScheduleAlert(user, 'summer')
  })

}


export const getCourseDetailsAlert = (course, course_hours_remaining) => {
  let t = store.getState().literals.literals;
  let dir = store.getState().literals.dir;
  Alert.fire({
    title:
      course.title,
    html:
      `<div class="table-responsive">
      <table class="table">
       <tbody class=${dir}>
        <tr><td><div>${t.serial_num}: ${course.serial_num}</div></td></tr>
        <tr><td><div>${t.location}: ${course.location}</div></td></tr>
        <tr><td><div>${t.year}: ${t[course.year]}</div></td></tr>
        <tr><td><div>${t.semester}: ${t[course.semester]}</div></td></tr>
        <tr><td><div>${t.course_hours}: ${course.course_hours}</div></td></tr>
        <tr><td><div>${t.course_hours_remaining}: ${course_hours_remaining}</div></td></tr>
      </tbody>
      </div>`,
    confirmButtonText: t.ok,
  })
}