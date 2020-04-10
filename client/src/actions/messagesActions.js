import { GET_MESSAGES, SET_LOADING_MESSAGES } from './types';
import axios from 'axios';
import store from '../store';
import Alert from 'sweetalert2';

export const getMessages = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/messages/manage');
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
    Alert.fire(text)

  }
}