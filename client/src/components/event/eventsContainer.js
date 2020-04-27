import { Draggable } from '@fullcalendar/interaction'; // needed for dayClick
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventsActions';
import { showRightPlaces, deleteRightPlaces } from '../../actions/scheduleActions';
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
        let first_name = eventEl.getAttribute('first_name');
        let last_name = eventEl.getAttribute('last_name');
        let semester = eventEl.getAttribute('semester');
        let location = eventEl.getAttribute('location');
        let course_hours = eventEl.getAttribute('course_hours');
        let course_hours_remaining = eventEl.getAttribute('course_hours_remaining');
        let year = eventEl.getAttribute('year');
        let backgroundColor = eventEl.getAttribute('backgroundColor');

        //the info that retrun from the events into the container to the events that dragging to the schedule
        return {
          title,
          timetableid,
          id,
          id_number,
          serial_num,
          first_name,
          last_name,
          semester,
          location,
          course_hours,
          course_hours_remaining,
          year,
          backgroundColor,
        };
      },
    });
    dragContainer.dragging.emitter._handlers.dragstart.push((e) => { showRightPlaces(e) })
    dragContainer.dragging.emitter._handlers.dragend.push((e) => { deleteRightPlaces() })
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
                style={{ backgroundColor: event.user.color }}
                className='fc-event draggable tool-tip'
                timetableid={event._id}
                title={event.performance.title}
                id={event.performance._id}
                serial_num={event.performance.serial_num}
                key={event._id}
                id_number={event.user.id_number}
                first_name={event.user.first_name}
                last_name={event.user.last_name}
                location={event.performance.location}
                semester={event.performance.semester}
                course_hours={event.performance.course_hours}
                course_hours_remaining={event.course_hours_remaining}
                year={event.performance.year}
                backgroundcolor={event.user.color}
              >
                <div className='cut-text'>
                  {this.props.t.name}: {event.user.first_name}{' '}
                  {event.user.last_name}
                </div>
                <div className='cut-text'>
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
        </div>
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
