import { GET_MESSAGES, SET_LOADING_MESSAGES } from './types';
import axios from 'axios';
import store from '../store';
import Alert from 'sweetalert2';
import { popupAlert } from './alertsActions';

export const getAds = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/ads/manage');
    store.dispatch({
      type: GET_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING_MESSAGES
  });
};

export const createNewMessage = async () => {
  let t = store.getState().literals;
  const { value: text } = await Alert.fire({
    title: t.literals.type_a_new_message,
    input: 'textarea',
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel
  })

  if (text) {
    saveOnDB(text);
    getAds()
  }
}

const saveOnDB = async content => {
  try {
    const res = await axios.post('/api/ads/manage', { content });
    popupAlert(res.data.title, res.data.msg, res.data.type);
  } catch (err) {
    console.log(err);
  }
}

export const deleteAdAlert = id => {
  let t = store.getState().literals;
  Alert.fire({
    title: t.literals.delete_msg_title,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel
  }).then(result => {
    if (result.value) {
      // It will remove user
      deleteAd(id);
    }
  });
};

const deleteAd = async id => {
  try {
    const res = await axios.delete(`/api/ads/manage/${id}`);
    popupAlert('congratulations', res.data.msg, res.data.type);
    getAds();
  } catch (err) {
    console.log(err);
  }
}