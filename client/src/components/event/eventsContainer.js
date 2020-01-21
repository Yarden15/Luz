import { Draggable } from '@fullcalendar/interaction'; // needed for dayClick
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventsContainerActions';
import Spinner from '../layout/Spinner';

export class eventsContainer extends Component {

  componentDidMount() {
    let draggableEl = document.getElementById('external-events');
    getEvents('123456789');
    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        //takes the information from the attribute to variables
        let title = eventEl.getAttribute('title');
        let id = eventEl.getAttribute('id');
        let id_number = eventEl.getAttribute('id_number');
        let serial_num = eventEl.getAttribute('serial_num');
        let first_name = eventEl.getAttribute('first_name');
        let last_name = eventEl.getAttribute('last_name');
        let semester = eventEl.getAttribute('semester');
        let location = eventEl.getAttribute('location');
        let course_hours = eventEl.getAttribute('course_hours');
        let year = eventEl.getAttribute('year');

        //the info that retrun from the events into the container to the events that dragging to the schedule
        return {
          title,
          id,
          id_number,
          serial_num,
          first_name,
          last_name,
          semester,
          location,
          course_hours,
          year
        };
      }
    });
  }//if the courses still not arrived from the server we displaying spinner
  render() {
    if (this.props.eventObj.loading) {
      return (
        <div id='external-events'>
          <p>
            <strong>Courses</strong>
          </p>
          <Spinner id='spinner-events-container' />
        </div>
      )
    } else {//display the courses
      return (
        <div id='external-events'>
          <p>
            <strong>Courses</strong>
          </p>
          <div>
            {this.props.eventObj.events.map(event => (
              <div
                className='fc-event draggable'
                title={event.performance.title}
                id={event.performance._id}
                serial_num={event.performance.serial_num}
                key={event.performance._id}
                id_number={event.user.id_number}
                first_name={event.user.first_name}
                last_name={event.user.last_name}
                location={event.performance.location}
                semester={event.performance.semester}
                course_hours={event.performance.course_hours}
                year={event.performance.year}
              >
                <div>{event.performance.title} - {event.user.first_name} {event.user.last_name}</div>
                <div>Id: {event.performance.serial_num}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    eventObj: state.event
  };
};

export default connect(mapStateToProps)(eventsContainer);
