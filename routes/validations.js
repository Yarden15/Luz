const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  // Pull from the req.body the fields to validate
  const { event, schedules } = req.body;
  //checks if there is collisions between courses - return error
  for (let i = 0; i < schedules.length; i++) { //loop that runs on the schedules
    for (let j = 0; j < schedules[i].events.length; j++) {  //loop runs on the events for each schedule
      if (event.eventId !== schedules[i].events[j].eventId && //checks if is the same event
        event.serial_num === schedules[i].events[j].serial_num && //checks if is the same course
        event.daysOfWeek[0] == schedules[i].events[j].daysOfWeek[0] && //checks if is the same day
        checkTimeClash(event, schedules[i].events[j])) { //checks if the time of the events is clash
        return res.json({
          type: 'error',
          msg: 'events_colide',
          event1: event,
          sched1Id: event.schedId,
          event2: schedules[i].events[j],
          sched2Id: schedules[i].id
        });
      }
    }
  }

  //checks if there is collisions between same user - return error

  //checks if the course has passed the number of hours - return error

  //checks if there is time for the user to move between places - return warning

  //checks if the user give this day/hour - return warning

  //if the action is ok
  return res.json({
    type: 'ok',
    msg: 'correct_action',
    event1Id: event.eventId,
    sched1Id: event.schedId

  })


});


const checkTimeClash = (event1, event2) => {
  if (event1.startTime <= event2.startTime && event1.endTime > event2.startTime)
    return true;
  if (event2.startTime <= event1.startTime && event2.endTime > event1.startTime)
    return true;

  return false;
}
module.exports = router;