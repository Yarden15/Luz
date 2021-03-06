import { Draggable } from '@fullcalendar/interaction'; // needed for dayClick
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents, getUserDetailsAlert, getCourseDetailsAlert } from '../../actions/eventsActions';
import { showRightPlaces, showWrongPlaces, deleteBackgroundEvents } from '../../actions/scheduleActions';
import Spinner from '../layout/Spinner';



export class eventsContainer extends Component {
  componentDidMount() {
    let draggableEl = document.getElementById('external-events');
    if (!this.props.eventObj.events)
      getEvents();
    let dragContainer = new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        //takes the information from the attribute to variables
        let title = eventEl.getAttribute('title');
        let timetableid = eventEl.getAttribute('timetableid');
        let id = eventEl.getAttribute('id');
        let id_number = eventEl.getAttribute('id_number');
        let serial_num = eventEl.getAttribute('serial_num');
        let userid = eventEl.getAttribute('userid');
        let first_name = eventEl.getAttribute('first_name');
        let last_name = eventEl.getAttribute('last_name');
        let semester = eventEl.getAttribute('semester');
        let location = eventEl.getAttribute('location');
        let course_hours = eventEl.getAttribute('course_hours');
        let course_id = eventEl.getAttribute('course_id');
        let course_hours_remaining = eventEl.getAttribute('course_hours_remaining');
        let year = eventEl.getAttribute('year');
        let backgroundColor = eventEl.getAttribute('backgroundColor');
        let constraints = eventEl.getAttribute('constraints');

        //the info that retrun from the events into the container to the events that dragging to the schedule
        return {
          title,
          timetableid,
          id,
          id_number,
          userid,
          serial_num,
          first_name,
          last_name,
          semester,
          location,
          course_id,
          course_hours,
          course_hours_remaining,
          year,
          backgroundColor,
          constraints
        };
      },
    });
    dragContainer.dragging.emitter._handlers.dragstart.push((e) => {
      showRightPlaces(e.subjectEl.id);
      showWrongPlaces(e.subjectEl.id);
    })
    dragContainer.dragging.emitter._handlers.dragend.push(() => { deleteBackgroundEvents() })
  } //if the courses still not arrived from the server we displaying spinner

  render() {
    if (this.props.eventObj.loading) {
      return (
        <div id='external-events'>
          <p>
            <strong>{this.props.t.courses}</strong>
          </p>
          <Spinner id='spinner-events-container' />
        </div>
      );
    } else {
      //display the courses
      return (
        <div id='external-events'>
          <p>
            <strong>{this.props.t.courses}</strong>
          </p>
          <div>
            {this.props.eventObj.displayEvents.map((event) => (
              <div
                style={{ backgroundColor: event.user.color, display: event.course_hours_remaining === '00:00' ? 'none' : '' }}
                className='fc-event draggable tool-tip'
                id={event._id}
                timetableid={event._id}
                title={event.performance.title}
                course_id={event.performance._id}
                serial_num={event.performance.serial_num}
                key={event._id}
                userid={event.user._id}
                id_number={event.user.id_number}
                first_name={event.user.first_name}
                last_name={event.user.last_name}
                location={event.performance.location}
                semester={event.performance.semester}
                course_hours={event.performance.course_hours}
                course_hours_remaining={event.course_hours_remaining}
                year={event.performance.year}
                backgroundcolor={event.user.color}
                constraints={event.user.constraints}
              >
                <div onClick={() => { getUserDetailsAlert(event.user, event.performance) }} className='clickable cut-text'>
                  {this.props.t.name}: {event.user.first_name}{' '}
                  {event.user.last_name}
                </div>
                <div onClick={() => { getCourseDetailsAlert(event.performance, event.course_hours_remaining) }} className='clickable cut-text'>
                  {this.props.t.course_title}: {event.performance.title}
                </div>
                <div className='cut-text'>
                  {this.props.t.serial_num}: {event.performance.serial_num}
                </div>
                <div className={`tooltiptext ${this.props.dir}`}>
                  <div>
                    {this.props.t.course_title}: {event.performance.title}
                  </div>
                  <div>
                    {this.props.t.serial_num}: {event.performance.serial_num}
                  </div>
                  <div>
                    {this.props.t.name}: {event.user.first_name}{' '}
                    {event.user.last_name}
                  </div>
                  <div>
                    {this.props.t.location}: {event.performance.location}
                  </div>
                  <div>
                    {this.props.t.year}: {this.props.t[event.performance.year]}
                  </div>
                  <div>
                    {this.props.t.semester}:{' '}
                    {this.props.t[event.performance.semester]}
                  </div>
                  <div>
                    {this.props.t.course_hours}:{' '}
                    {event.performance.course_hours}
                  </div>
                  <div>
                    {this.props.t.course_hours_remaining}:{' '}
                    {event.course_hours_remaining}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div >
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    eventObj: state.event,
    t: state.literals.literals,
    dir: state.literals.dir,
    schedule: state.schedule.current
  };
};

export default connect(mapStateToProps)(eventsContainer);
