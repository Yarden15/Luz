import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import eventReducer from './eventsContainerReducer';

export default combineReducers({
  schedule: scheduleReducer
  // event: eventReducer
});