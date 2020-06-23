const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // Pull from the req.body the fields to validate
  const { schedules, errors, events, users, event } = req.body;
  //create the popup message
  let popupMsg = { popup: false, errors: [] };
  //getting the user of the event
  let user = getUser(event.userid, users);
  //getting the schedule of the event
  let schedule = getSchedule(event.schedId, schedules);
  //array of errors that fixed
  let fixed_errors = [];
  //update event on errors
  for (let i = 0; i < errors.length; i++) {
    if (event.eventId === errors[i].event.eventId) errors[i].event = event;
  }

  //checks year
  if (event.year !== schedule.year) {
    addErrorToMsg('invalid_year', popupMsg);
    addEventToErrors(event, 'invalid_year', errors);
  } else {
    checkAndRemove(event.eventId, 'invalid_year', errors, fixed_errors);
  }
  //Checks the semester
  if (event.semester !== schedule.semester) {
    addErrorToMsg('invalid_semester', popupMsg);
    addEventToErrors(event, 'invalid_semester', errors);
  } else {
    checkAndRemove(event.eventId, 'invalid_semester', errors, fixed_errors);
  }
  //Checks the location
  if (event.location !== schedule.location) {
    addErrorToMsg('invalid_location', popupMsg);
    addEventToErrors(event, 'invalid_location', errors);
  } else {
    checkAndRemove(event.eventId, 'invalid_location', errors, fixed_errors);
  }

  //Checks if the user gives this day/hour
  if (checksUserSchedule(event, user)) {
    addErrorToMsg('not_in_time', popupMsg);
    addEventToErrors(event, 'not_in_time', errors);
  } else {
    checkAndRemove(event.eventId, 'not_in_time', errors, fixed_errors);
  }

  //Checks for collisions between events of the same user
  let alreadyPushed = false;
  for (let i = 0; i < schedules.length; i++) {
    for (let j = 0; j < schedules[i].events.length; j++) {
      if (event.eventId !== schedules[i].events[j].eventId) {
        //checks is not the same event
        if (schedules[i].events[j].userid === event.userid) {
          //checks is the same user
          if (schedules[i].events[j].semester === event.semester) {
            //checks for semesters
            if (
              parseInt(event.daysOfWeek[0]) ==
              parseInt(schedules[i].events[j].daysOfWeek[0])
            ) {
              //checks if is the same day
              if (checkTimeClash(event, schedules[i].events[j])) {
                addEventToErrors(
                  schedules[i].events[j],
                  'clash_with_events',
                  errors
                );
                if (!alreadyPushed) {
                  alreadyPushed = true;
                  addErrorToMsg('clash_with_events', popupMsg);
                  addEventToErrors(event, 'clash_with_events', errors);
                }
              }
            }
          }
        }
      }
    }
  }

  //Checks if the course goes beyond its time
  let errors_ids = [];
  // check for the user if there are events that not collision anymore
  for (let i = 0; i < errors.length; i++) {
    let remove = true;
    for (let j = 0; j < schedules.length; j++) {
      for (let k = 0; k < schedules[j].events.length; k++) {
        if (
          checkTimeClash(errors[i].event, schedules[j].events[k]) &&
          parseInt(errors[i].event.daysOfWeek[0]) ==
          parseInt(schedules[j].events[k].daysOfWeek[0]) &&
          errors[i].event.semester === schedules[j].events[k].semester &&
          errors[i].event.userid === schedules[j].events[k].userid &&
          errors[i].event.eventId !== schedules[j].events[k].eventId
        ) {
          remove = false;
        }
      }
    }
    if (remove) {
      errors_ids.push(errors[i].event.eventId);
      remove = false;
    }
  }
  for (let i = 0; i < errors_ids.length; i++) {
    checkAndRemove(errors_ids[i], 'clash_with_events', errors, fixed_errors);
  }

  //Checks if the course goes beyond its times
  let courseTimeErrors = checkCourseTime(schedule, events, event);
  if (courseTimeErrors.exceed_from_time) {
    addErrorToMsg('time_exception', popupMsg);
    for (let i = 0; i < courseTimeErrors.same_events.length; i++) {
      addEventToErrors(
        courseTimeErrors.same_events[i],
        'time_exception',
        errors
      );
    }
  } else {
    checkAndRemove(event, 'time_exception', errors, fixed_errors);
  }

  //return the errors and the message for the user
  res.json({ errors, fixed_errors, popupMsg });
});

router.put('/delete', async (req, res) => {
  const { schedules, errors,event,events } = req.body;
  let fixed_errors = [];
  //Checks if the course goes beyond its time
  let errors_ids = [];
  //getting the schedule of the event
  let schedule = getSchedule(event.schedId, schedules);
  //Checks if the course goes beyond its times
  let courseTimeErrors = checkCourseTime(schedule, events, event);
  if (courseTimeErrors.exceed_from_time) {
    addErrorToMsg('time_exception', popupMsg);
    for (let i = 0; i < courseTimeErrors.same_events.length; i++) {
      addEventToErrors(
        courseTimeErrors.same_events[i],
        'time_exception',
        errors
      );
    }
  } else {
    checkAndRemove(event, 'time_exception', errors, fixed_errors);
  }

  // check for the user if there are events that not collision anymore
  for (let i = 0; i < errors.length; i++) {
    let remove = true;
    for (let j = 0; j < schedules.length; j++) {
      for (let k = 0; k < schedules[j].events.length; k++) {
        if (
          checkTimeClash(errors[i].event, schedules[j].events[k]) &&
          parseInt(errors[i].event.daysOfWeek[0]) ==
          parseInt(schedules[j].events[k].daysOfWeek[0]) &&
          errors[i].event.semester === schedules[j].events[k].semester &&
          errors[i].event.eventId !== schedules[j].events[k].eventId
        ) {
          remove = false;
        }
      }
    }
    if (remove) {
      errors_ids.push(errors[i].event.eventId);
      remove = true;
    }
  }
  for (let i = 0; i < errors_ids.length; i++) {
    checkAndRemove(errors_ids[i], 'clash_with_events', errors, fixed_errors);
  }
  res.json({ errors: [], fixed_errors, popupMsg: [] });
});

const addErrorToMsg = (type, popupMsg) => {
  let addError = true;
  popupMsg.popup = true;
  for (let i = 0; i < popupMsg.errors.length; i++) {
    if (type === popupMsg.errors[i].type) {
      addError = false;
    }
  }
  if (addError) {
    popupMsg.errors.push(type);
  }
};
const addEventToErrors = (event, type, errors) => {
  let addEvent = true;
  for (let i = 0; i < errors.length; i++) {
    if (event.eventId === errors[i].event.eventId && errors[i].type === type) {
      addEvent = false;
      errors[i].event = event;
    }
  }
  if (addEvent) {
    errors.push({
      event: event,
      type: type,
    });
  }
};
const checkTimeClash = (event1, event2) => {
  if (event1.startTime <= event2.startTime && event1.endTime > event2.startTime)
    return true;
  else if (
    event2.startTime <= event1.startTime &&
    event2.endTime > event1.startTime
  )
    return true;
  else return false;
};
const checkTimeInSchedule = (userSched, event) => {
  if (
    userSched.startTime > event.startTime ||
    userSched.endTime < event.endTime
  )
    return true;
  return false;
};

const getSemester = (semester) => {
  if (semester === 'a') {
    return 'semesterA';
  } else if (semester === 'b') {
    return 'semesterB';
  } else if (semester === 'summer') {
    return 'semesterC';
  }
};
const checksUserSchedule = (event, user) => {
  let semester = getSemester(event.semester);
  switch (event.daysOfWeek[0]) {
    case 0:
      return checksHours(
        user.constraints[semester].sunday_start,
        user.constraints[semester].sunday_end,
        event.startTime,
        event.endTime
      );

    case 1:
      return checksHours(
        user.constraints[semester].monday_start,
        user.constraints[semester].monday_end,
        event.startTime,
        event.endTime
      );

    case 2:
      return checksHours(
        user.constraints[semester].tuesday_start,
        user.constraints[semester].tuesday_end,
        event.startTime,
        event.endTime
      );

    case 3:
      return checksHours(
        user.constraints[semester].wednesday_start,
        user.constraints[semester].wednesday_end,
        event.startTime,
        event.endTime
      );

    case 4:
      return checksHours(
        user.constraints[semester].thursday_start,
        user.constraints[semester].thursday_end,
        event.startTime,
        event.endTime
      );

    case 5:
      return checksHours(
        user.constraints[semester].friday_start,
        user.constraints[semester].friday_end,
        event.startTime,
        event.endTime
      );

    default:
      return false;
  }
};
const checksHours = (day_start, day_end, event_start, event_end) => {
  if (day_start === '' || day_end === '') return false;
  return checkTimeInSchedule(
    { startTime: day_start, endTime: day_end },
    { startTime: event_start, endTime: event_end }
  );
};
//get user ID and array of users and return the user object
const getUser = (id, users) => {
  for (let i = 0; i < users.length; i++) {
    if (id === users[i]._id) return users[i];
  }
};
//get schedule ID and array of schedules and return the schedule object
const getSchedule = (id, schedules) => {
  for (let i = 0; i < schedules.length; i++) {
    if (id === schedules[i].id) return schedules[i];
  }
};

const checkAndRemove = (eventId, type, errors, fixed_errors, event) => {

  if (type === 'time_exception') {
    for (let i = 0; i < errors.length; i++) {
      if (eventId.timeTableId === errors[i].event.timeTableId && errors[i].type === type) {
        fixed_errors.push({ event: errors[i].event, type: errors[i].type });
        errors.splice(i, 1);
        i--;
      }
    }
  } else {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i].event.eventId === eventId && errors[i].type === type) {
        fixed_errors.push({ event: errors[i].event, type: errors[i].type });
        errors.splice(i, 1);
        i--;
      }
    }
  }
};

const calculateDiffBetweenTimes = (start, end) => {
  start = start.split(':');
  end = end.split(':');
  let diffHours = parseInt(end[0]) - parseInt(start[0]);
  start = parseInt(start[0] + start[1]);
  end = parseInt(end[0] + end[1]);

  let totalMinutes = end - start - diffHours * 40;

  return totalMinutes;
};

const minutesToTimeStamp = (totalMinutes) => {
  let timeStamp = '';
  let minutes;
  let hours;

  if (totalMinutes < 0) {
    totalMinutes = Math.abs(totalMinutes);
    timeStamp = '-';
  }
  minutes = totalMinutes % 60;
  hours = parseInt(totalMinutes / 60);

  minutes < 10 ? (minutes = '0' + minutes) : (minutes = minutes.toString());
  hours < 10 ? (hours = '0' + hours) : (hours = hours.toString());
  timeStamp += hours + ':' + minutes;

  return timeStamp;
};

const checkCourseTime = (schedule, events, event) => {
  let timeOnSched = 0;
  let course_hours;
  let same_events = [];

  for (let i = 0; i < schedule.events.length; i++) {
    if (event.timeTableId === schedule.events[i].timeTableId)
      same_events.push(schedule.events[i]);
    timeOnSched += calculateDiffBetweenTimes(
      schedule.events[i].startTime,
      schedule.events[i].endTime
    );
  }
  timeOnSched = minutesToTimeStamp(timeOnSched);
  for (let i = 0; i < events.length; i++) {
    if (event.timeTableId === events[i]._id) {
      course_hours = events[i].performance.course_hours;
      break;
    }
  }
  let exceed_from_time = timeOnSched > course_hours;
  return { exceed_from_time, same_events };
};

module.exports = router;
