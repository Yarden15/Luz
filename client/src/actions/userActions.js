import { GET_USERS, SET_LOADING_USER } from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
import Alert from 'sweetalert2';
import { cleanSchedules, getSchedules, saveAllSchedules, } from './scheduleActions';
import { loadUser } from './authActions';

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING_USER,
  });
};

export const getUsers = async () => {
  setLoading();
  try {
    const res = await axios.get('/api/users/manage');
    store.dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserAlert = (user) => {
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
    cancelButtonText: t.literals.cancel,
  }).then((result) => {
    if (result.value) {
      deleteUser(user._id);
    }
  });
};

const deleteUser = async (id) => {
  let t = store.getState().literals;

  try {
    saveAllSchedules();
    await axios.delete(`/api/users/manage/${id}`);
    getUsers();
    cleanSchedules();
    getSchedules();
    Alert.fire(
      t.literals.deleted,
      t.literals.the_user_has_been_deleted,
      'success'
    );
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = (id) => {
  let users = store.getState().user.users;
  for (let i = 0; i < users.length; i++) {
    if (users[i]._id === id) {
      return users[i];
    }
  }
};
//update user by the admin
export const updateUser = async (user) => {
  try {
    saveAllSchedules();
    const res = await axios.put(`/api/users/manage/details/${user._id}`, user);
    getUsers();
    cleanSchedules();
    getSchedules();
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
      newPassword2: document.getElementById('newPassword2').value,
    }),
  };

  const resetPw = async () => {
    const alertVal = await Alert.fire(changePwSwal);
    let v = (alertVal && alertVal.value) || alertVal.dismiss;
    if ((v && v.newPassword1 && v.newPassword2) || v === 'cancel') {
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
  };

  resetPw();
};

const resetPassword = async (userId, password) => {
  try {
    const res = await axios.put(`/api/users/manage/pass/${userId}`, {
      password: password,
    });
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    console.error(err);
  }
};

export function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const changePasswordAlert = (id) => {
  let t = store.getState().literals.literals;
  let dir = store.getState().literals.dir;

  let changePwSwal = {
    title: t.change_password,
    focusConfirm: false,
    html: `
    <div class=${dir}>
        <label htmlFor="password">${t.current_password}</label> 
        <input class="swal2-input " id="currentPassword" type="password" />
        <label htmlFor="password">${t.new_password}</label> 
        <input class="swal2-input" id="newPassword1" type="password"/>
        <label htmlFor="password">${t.confirm_new_password}</label> 
        <input class="swal2-input" id="newPassword2" type="password"  />
    </div>
    `,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: t.ok,
    cancelButtonText: t.cancel,
    cancelButtonColor: '#d33',
    allowOutsideClick: false,
    preConfirm: () => ({
      currentPassword: document.getElementById('currentPassword').value,
      newPassword1: document.getElementById('newPassword1').value,
      newPassword2: document.getElementById('newPassword2').value,
    }),
  };

  const changePw = async () => {
    const alertVal = await Alert.fire(changePwSwal);
    let v = (alertVal && alertVal.value) || alertVal.dismiss;
    if (
      (v && v.currentPassword && v.newPassword1 && v.newPassword2) ||
      v === 'cancel'
    ) {
      if (v.newPassword1 !== v.newPassword2) {
        await Alert.fire({ type: 'error', title: t.passwords_do_not_match });
        changePw();
      } else if (v !== 'cancel' && v.newPassword1.length < 6) {
        await Alert.fire({ type: 'error', title: t.short_pass_msg });
        changePw();
      } else if (v !== 'cancel') {
        changePasswordByTheUser(alertVal.value.newPassword1, alertVal.value.currentPassword);
      }
    } else {
      await Alert.fire({ type: 'error', title: t.all_fields_are_required });
      changePw();
    }
  };

  changePw();
};

export const getRole = async () => {
  try {
    const res = await axios.get('/api/users/me/role');
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
}

export const updateByTheUser = async (updateDetails) => {
  try {
    saveAllSchedules();
    const res = await axios.put('/api/users/me/details', updateDetails);
    getUsers();
    cleanSchedules();
    getSchedules();
    loadUser();
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    console.error(err);
  }
}

const changePasswordByTheUser = async (newPassword, oldPassword) => {
  try {
    const res = await axios.put(`/api/users/me/pass/`, {
      newPassword, oldPassword
    });
    popupAlert('congratulations', res.data, 'regular');
  } catch (err) {
    console.log(err.response.data.msg)
    popupAlert('error', err.response.data.msg, 'error');
  }
};

export const lockSubmitAlert = (user) => {
  let t = store.getState().literals;
  Alert.fire({
    title: t.literals.lock_submit_msg,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel,
  }).then((result) => {
    if (result.value) {
      console.log(user._id)
      lockSubmit(user._id);
    }
  });
}

export const unlockSubmitAlert = (user) => {
  let t = store.getState().literals;
  Alert.fire({
    title: t.literals.unlock_submit_msg,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel,
  }).then((result) => {
    if (result.value) {
      unlockSubmit(user._id);
    }
  });
}

const unlockSubmit = async (user) => {
  try {
    await axios.put(`/api/users/manage/allow_submit/${user}`);
    getUsers();
  } catch (err) {
    console.log(err);
  }
}

const lockSubmit = async (user) => {
  try {
    await axios.put(`/api/users/manage/block_submit/${user}`);
    getUsers();
  } catch (err) {
    console.log(err);
  }
}

export const unlockSubmitAllAlert = () => {
  let t = store.getState().literals;
  Alert.fire({
    title: t.literals.unlock_submit_all_msg,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel,
  }).then((result) => {
    if (result.value) {
      unlockSubmitAll();
    }
  });
}

export const lockSubmitAllAlert = () => {
  let t = store.getState().literals;
  Alert.fire({
    title: t.literals.lock_submit_all_msg,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t.literals.ok,
    cancelButtonText: t.literals.cancel,
  }).then((result) => {
    if (result.value) {
      lockSubmitAll();
    }
  });
}

const lockSubmitAll = async () => {
  try {
    await axios.put('/api/users/manage/block_submit_all');
    getUsers();
  } catch (err) {
    console.log(err);
  }
}

const unlockSubmitAll = async () => {
  try {
    await axios.put('/api/users/manage/allow_submit_all');
    getUsers();
  } catch (err) {
    console.log(err);
  }
}