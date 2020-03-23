import { Draggable } from '@fullcalendar/interaction'; // needed for dayClick
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventsActions';
import Spinner from '../layout/Spinner';

export class eventsContainer extends Component {

  componentDidMount() {
    let draggableEl = document.getElementById('external-events');
    getEvents();
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
        let backgroundColor = eventEl.getAttribute('backgroundColor');

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
          year,
          backgroundColor
        };
      }
    });
  }//if the courses still not arrived from the server we displaying spinner
  render() {
    if (this.props.eventObj.loading) {
      return (
        <div id='external-events'>
          <p>
            <strong>{this.props.t.courses}</strong>
          </p>
          <Spinner id='spinner-events-container' />
        </div>
      )
    } else {//display the courses
      return (
        <div id='external-events'>
          <p>
            <strong>{this.props.t.courses}</strong>
          </p>
          <div>
            {this.props.eventObj.events.map(event => (
              <div style={{ backgroundColor: event.user.color }}
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
                backgroundcolor={event.user.color}
              >
                <div>
                  {this.props.dir === 'ltr' ?
                    `${this.props.t.name}: ${event.user.first_name} ${event.user.last_name}`
                    :
                    `${event.user.first_name} ${event.user.last_name} :${this.props.t.name}`
                  }</div>
                <div>
                  {this.props.dir === 'ltr' ?
                    `${event.performance.title} :${this.props.t.course_title}`
                    :
                    `${this.props.t.course_title}: ${event.performance.title}`
                  }</div>
                <div>
                  {this.props.dir === 'ltr' ?
                    `${this.props.t.serial_num}: ${event.performance.serial_num}`
                    :
                    `${event.performance.serial_num} :${this.props.t.serial_num}`
                  }</div>
                {/* <div className='tooltiptext'>
                  {event.performance.title}
                  {event.performance.serial_num}
                  {event.user.first_name}
                  {event.user.last_name}
                  {event.performance.location}
                  {event.performance.semester}
                  {event.performance.course_hours}
                  {event.performance.year}
                </div> */}
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
    eventObj: state.event,
    t: state.literals.literals,
    dir: state.literals.dir,
  };
};

export default connect(mapStateToProps)(eventsContainer);
