import { GET_USERS, SET_LOADING_USER } from './types';
import axios from 'axios';
import store from '../store';
import { popupAlert } from './alertsActions';
import { displayAlert } from './authActions';
import Alert from 'sweetalert2';

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
      // It will remove user
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

export const updateUser = user => {
  console.log('update user', user);
};

export const resetPasswordAlert = user => { };

const setLoading = () => {
  store.dispatch({
    type: SET_LOADING_USER
  });
};
