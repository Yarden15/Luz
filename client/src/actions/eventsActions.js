import {
  GET_EVENTS,
  EVENT_ERROR,
  SET_LOADING,
  REGISTER_FAIL,
  GET_USERS,
  GET_COURSES
} from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
import { displayAlert } from './authActions';
import Alert from 'sweetalert2';

// Get events form DataBase
export const getEvents = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/timetables');
    store.dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (error) {
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.response.data
    });
  }
};

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING
  });
};
// Create new course
export const createCourse = async FormData => {
  try {
    const res = await axios.post('/api/performances/manage', FormData);
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
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
      payload: res.data
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
      payload: 'select_user_and_course'
    });
    displayAlert();
  } else if (userId === '') {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: 'select_user'
    });
    displayAlert();
  } else if (courseId === '') {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: 'select_course'
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
        payload: err.response.data
      });
      console.log(err);
      displayAlert();
    }
  }
};

export const getCourseById = id => {
  let courses = store.getState().event.courses;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i]._id === id) {
      return courses[i];
    }
  }
};

export const updateCourse = async course => {
  try {
    const res = await axios.put(`/api/performances/${course._id}`, course);
    getCourses();
    popupAlert('congratulations', res.data.msg, 'regular');
  } catch (err) {
    console.error(err);
  }
};

export const deleteCourseAlert = course => {
  let t = store.getState().literals;
  console.log(course)
  Alert.fire({
    title: t.literals.delete_schedule_title_part,
    html:
      `<div className=${t.dir}>${t.literals.course_title}: ${course.title}</div>` +
      `<div className=${t.dir}>${t.literals.serial_number}: ${course.serial_num}</div>`,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel
  }).then(result => {
    if (result.value) {
      // It will remove user
      deleteCourse(course._id);
    }
  });
};

const deleteCourse = async id => {
  let t = store.getState().literals;
  try {
    const res = await axios.delete(`/api/performances/${id}`);
    getCourses();
    Alert.fire(
      t.literals.deleted,
      t.literals.the_course_has_been_deleted,
      'success'
    );
  } catch (err) {
    console.log(err);
  }
};