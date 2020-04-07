import { GET_USERS, SET_LOADING_USER } from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
import Alert from 'sweetalert2';

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING_USER
  });
};


export const getUsers = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/users/manage');
    store.dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserAlert = user => {
  let t = store.getState().literals;
  Alert.fire({
    title: t.literals.delete_schedule_title_part,
    html:
      `<div className=${t.dir}>${t.literals.name}: ${user.first_name} ${user.last_name}</div>` +
      `<div className=${t.dir}>${t.literals.id}: ${user.id_number}</div>`,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel
  }).then(result => {
    if (result.value) {
      deleteUser(user._id);
    }
  });
};

const deleteUser = async id => {
  let t = store.getState().literals;

  try {
    const res = await axios.delete(`/api/users/manage/${id}`);
    getUsers();
    Alert.fire(
      t.literals.deleted,
      t.literals.the_user_has_been_deleted,
      'success'
    );
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = id => {
  let users = store.getState().user.users;
  for (let i = 0; i < users.length; i++) {
    if (users[i]._id === id) {
      return users[i];
    }
  }
};

export const updateUser = async user => {
  console.log(user);
  try {
    const res = await axios.put(`/api/users/manage/details/${user._id}`, user);
    getUsers();
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    console.error(err);
  }
};


export const handleResetPassword = (id) => {
  let t = store.getState().literals.literals;
  let changePwSwal = {
    title: t.reset_password,
    focusConfirm: false,
    html: `
      <label htmlFor="password">${t.new_password}</label> 
      <input class="swal2-input" id="newPassword1" type="password"/>
      <label htmlFor="password">${t.confirm_new_password}</label> 
      <input class="swal2-input" id="newPassword2" type="password"  />
    `,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    preConfirm: () => ({
      newPassword1: document.getElementById('newPassword1').value,
      newPassword2: document.getElementById('newPassword2').value
    })
  };

  const resetPw = async () => {
    const alertVal = await Alert.fire(changePwSwal);
    let v = alertVal && alertVal.value || alertVal.dismiss;
    if (v && v.newPassword1 && v.newPassword2 || v === 'cancel') {
      if (v.newPassword1 !== v.newPassword2) {
        await Alert.fire({ type: 'error', title: t.passwords_do_not_match });
        resetPw();
      } else if (v !== 'cancel' && v.newPassword1.length < 6) {
        await Alert.fire({ type: 'error', title: t.short_pass_msg });
        resetPw();
      } else if (v !== 'cancel') {
        resetPassword(id, alertVal.value.newPassword1);
      }
    } else {
      await Alert.fire({ type: 'error', title: t.all_fields_are_required });
      resetPw();
    }
  }

  resetPw();
}

const resetPassword = async (userId, password) => {
  try {
    const res = await axios.put(`/api/users/manage/pass/${userId}`, { password: password });
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    console.error(err);
  }
};
