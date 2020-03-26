import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import eventReducer from './eventsReducer';
import authReducer from './authReducer';
import literalReducer from './literalReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';

export default combineReducers({
  event: eventReducer,
  schedule: scheduleReducer,
  auth: authReducer,
  literals: literalReducer,
  alerts: alertReducer,
  user: userReducer
});