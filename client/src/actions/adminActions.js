import { GET_LOCATIONS, SET_LOADING_LOCATION } from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
import { displayAlert } from './authActions';
import Alert from 'sweetalert2';

export const getLocations = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/locations/manage');
    store.dispatch({
      type: GET_LOCATIONS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteLocationAlert = location => {
  let t = store.getState().literals;
  console.log(location);
  Alert.fire({
    title: t.literals.delete_schedule_title_part,
    html:
      `<h1 className=${t.dir}>${t.literals.name}: ${location.name}</h1>`,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel
  }).then(result => {
    if (result.value) {
      // It will remove user
      deleteLocation(location._id);
    }
  });
};

const deleteLocation = async id => {
  let t = store.getState().literals;

  try {
    const res = await axios.delete(`/api/locations/manage/${id}`);
    getLocations();
    Alert.fire(
      t.literals.deleted,
      t.literals.the_location_has_been_deleted,
      'success'
    );
  } catch (err) {
    console.log(err);
  }
};


const setLoading = () => {
  store.dispatch({
    type: SET_LOADING_LOCATION
  });
};

export const createLocationAlert = () => {
  let t = store.getState().literals.literals;
  Alert.fire({
    title: t.enter_title_please,
    input: 'text',
    showCancelButton: true,
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    inputValidator: result => {
      if (!result) return t.you_must_insert_input;
    }
  }).then(result => {
    if (result.value) {
      createLocation(result.value);
    }
  });
}

const createLocation = async name => {
  try {
    const res = await axios.post('/api/locations/manage', { name: name });
    console.log("jssdjakdsldsa")
    popupAlert('congratulations', res.data.msg, 'regular');
    getLocations();
  } catch (err) {
    popupAlert('congratulations', err, 'error');
  }
}