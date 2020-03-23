import { GET_EVENTS, EVENT_ERROR, SET_LOADING, REGISTER_FAIL, GET_USERS, GET_COURSES } from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
import { displayAlert } from './authActions';


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
      payload: error.response.data
    });
  }
};

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING,
  });
};

export const createCourse = async FormData => {
  try {
    const res = await axios.post('/api/performances/', FormData);
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    store.dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });
    displayAlert();
  }
}

export const getUsers = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/users');
    store.dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const getCourses = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/performances');
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
}

export const createEvent = async (userId, courseId) => {
  let form = { userId, courseId, group_name: "sdad" };
  console.log(form);
  try {
    const res = await axios.post('/api/timetables', form);
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    // store.dispatch({
    //   type: REGISTER_FAIL,
    //   payload: err.response.data
    // });
    console.log(err);
    // displayAlert();
  }
}