import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import eventReducer from './eventsContainerReducer';
import authReducer from './authReducer';
import literalReducer from './literalReducer';

export default combineReducers({
  event: eventReducer,
  schedule: scheduleReducer,
  auth: authReducer,
  literals: literalReducer 
});