const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // Pull from the req.body the fields to validate
  const { schedules, errors, events, users, event } = req.body;
  //create the popup message
  let popupMsg = { 'popup': false, 'errors': [] };
  //getting the user of the event
  let user = getUser(event.userid, users)
  //getting the schedule of the event
  let schedule = getSchedule(event.schedId, schedules);

  //checks year
  if (event.year !== schedule.year) {
    addErrorToMsg('invalid_year', popupMsg);
    addEventToErrors(event, 'invalid_year', errors);
  }
  //Checks the semester
  if (event.semester !== schedule.semester) {
    addErrorToMsg('invalid_semester', popupMsg);
    addEventToErrors(event, 'invalid_semester', errors);
  }
  //Checks if the user gives this day/hour
  if (checksUserSchedule(event, user)) {
    addErrorToMsg('not_in_time', popupMsg);
    addEventToErrors(event, 'not_in_time', errors)
  }
  //Checks for collisions between events of the same user
  let alreadyPushed = false;
  for (let i = 0; i < schedules.length; i++) {
    for (let j = 0; j < schedules[i].events.length; j++) {
      if (event.eventId !== schedules[i].events[j].eventId) { //checks is not the same event
        if (schedules[i].events[j].userid === event.userid) { //checks is the same user
          if (schedules[i].events[j].semester === event.semester) {//checks for semesters
            if (event.daysOfWeek[0] == schedules[i].events[j].daysOfWeek[0]) { //checks if is the same day
              if (checkTimeClash(event, schedules[i].events[j])) {
                addEventToErrors(schedules[i].events[j], 'clash_with_events', errors);
                if (!alreadyPushed) {
                  alreadyPushed = true;
                  addErrorToMsg('clash_with_events', popupMsg);
                  addEventToErrors(event, 'clash_with_events', errors)
                }
              }
            }
          }
        }
      }
    }
  }

  //Checks if the course goes beyond its time

  //return the errors and the message for the user
  res.json({ errors, popupMsg })
})

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
}
const addEventToErrors = (event, type, errors) => {
  let addEvent = true;
  for (let i = 0; i < errors.length; i++) {
    if (event.eventId === errors[i].event_id && errors[i].type === type) {
      addEvent = false;
    }
  }
  if (addEvent) {
    errors.push({
      sched_id: event.schedId,
      event_id: event.eventId,
      type: type
    });
  }
}
const checkTimeClash = (event1, event2) => {
  if (event1.startTime <= event2.startTime && event1.endTime > event2.startTime)
    return true;
  else if (event2.startTime <= event1.startTime && event2.endTime > event1.startTime)
    return true;
  else
    return false;
}
const checkTimeInSchedule = (userSched, event) => {
  if (userSched.startTime > event.startTime || userSched.endTime < event.endTime)
    return true;
  return false;
}
const getSemester = (semester) => {
  if (semester === 'a') {
    return 'semesterA'
  } else if (semester === 'b') {
    return 'semesterB'
  } else if (semester === 'summer') {
    return 'semesterC'
  }
}
const checksUserSchedule = (event, user) => {
  let semester = getSemester(event.semester)
  switch (event.daysOfWeek[0]) {
    case 0: return checksHours(user.constraints[semester].sunday_start, user.constraints[semester].sunday_end, event.startTime, event.endTime)

    case 1: return checksHours(user.constraints[semester].monday_start, user.constraints[semester].monday_end, event.startTime, event.endTime)

    case 2: return checksHours(user.constraints[semester].tuesday_start, user.constraints[semester].tuesday_end, event.startTime, event.endTime)

    case 3: return checksHours(user.constraints[semester].wednesday_start, user.constraints[semester].wednesday_end, event.startTime, event.endTime)

    case 4: return checksHours(user.constraints[semester].thursday_start, user.constraints[semester].thursday_end, event.startTime, event.endTime)

    case 5: return checksHours(user.constraints[semester].friday_start, user.constraints[semester].friday_end, event.startTime, event.endTime)

    default: return false;
  }
}
const checksHours = (day_start, day_end, event_start, event_end) => {
  if (day_start === '' || day_end === '')
    return false;
  return checkTimeInSchedule({ startTime: day_start, endTime: day_end }, { startTime: event_start, endTime: event_end })
}
const getUser = (id, users) => {
  for (let i = 0; i < users.length; i++) {
    if (id === users[i]._id)
      return users[i]
  }
}
const getSchedule = (id, schedules) => {
  for (let i = 0; i < schedules.length; i++) {
    if (id === schedules[i].id)
      return schedules[i];
  }
}

module.exports = router;


