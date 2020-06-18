import { GET_LOCATIONS, SET_LOADING_LOCATION } from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
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
    await axios.delete(`/api/locations/manage/${id}`);
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
  let msg = [];
  try {
    const res = await axios.post('/api/locations/manage', { name: name });
    msg.push(res.data.msg)
    popupAlert('congratulations', msg, 'regular');
    getLocations();
  } catch (err) {
    msg.push(err)
    popupAlert('congratulations', msg, 'error');
  }
}

export const createEmailAlert = () => {
  let t = store.getState().literals.literals;
  let dir = store.getState().literals.dir;
  let EmailAlert = {
    title: t.create_new_schedule,
    focusConfirm: false,
    html:
      `<div class=${dir}>${t.send_to}</div>` +
      `<select id="send-to" class="swal2-input" dir=${dir}>
      <option class=${dir} defaultValue></option>
      <option class=${dir} value='all'>${t.all}</option>
      <option class=${dir} value='admins'>${t.admins}</option>
      <option class=${dir} value='lecturers'>${t.lecturers}</option></select>`
      +
      `<div class=${dir}>${t.subject}</div>` +
      `<input type="text" id="subject-email" class="swal2-input" dir=${dir}></input>` +
      `<div className="comment ${dir}">
      <div class=${dir}>${t.message}</div>
      <textarea dir=${dir} id="message-email" class="swal2-input" cols="40" rows="5" ></textarea>
    </div>`,
    showCancelButton: true,
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    preConfirm: () => ({ //after the user click on confirm we taking the values
      sendTo: document.getElementById('send-to').value,
      subject: document.getElementById('subject-email').value,
      message: document.getElementById('message-email').value,
    }),
  };

  //this method popup alert the alert for create new email and checks if there is empty fields
  const createEmail = async () => {
    const alertVal = await Alert.fire(EmailAlert);
    let newEmail = (alertVal && alertVal.value) || alertVal.dismiss;
    if (newEmail && newEmail !== 'cancel' && newEmail !== 'esc') {
      if (
        newEmail.sendTo === '' ||
        newEmail.subject === '' ||
        newEmail.message === ''
      ) {
        await Alert.fire({ type: 'error', title: t.all_fields_are_required });
        createEmail();
      } else {
        sendGeneralEmail(newEmail.sendTo, newEmail.subject, newEmail.message)
      }
    }
  }
  createEmail();
}

const sendGeneralEmail = async (sendTo, subject, message) => {
  let users = store.getState().user.users;
  let emails = [];

  if (sendTo === 'all') {
    users.forEach(user => { emails.push(user.email); });
  } else if (sendTo === 'lecturers') {
    users.forEach(user => {
      if (user.lecturer)
        emails.push(user.email);
    });
  } else if (sendTo === 'admins') {
    users.forEach(user => {
      if (user.manager || user.scheduler)
        emails.push(user.email);
    })
  }

  let msg = [];
  let t = store.getState().literals.literals;
  try {
    await axios.post(`/api/emails/manage/general_mail`, { emails, subject, message });
    msg.push('send_mail_success_msg');
    popupAlert('send_mail_success_title', msg, 'regular');
  } catch (error) {
    console.error(error);
    msg.push('error_send_mail');
    popupAlert('error', msg, 'error');
  }
}