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
        console.log(eventEl);
        let title = eventEl.getAttribute('title');
        let id = eventEl.getAttribute('id');
        let teacherid = eventEl.getAttribute('teacherid');
        let serial_num = eventEl.getAttribute('serial_num');
        let name = eventEl.getAttribute('name');

        return {
          title: title,
          id: id,
          teacherid: teacherid,
          serial_num: serial_num,
          name: name
        };
      }
    });
  }
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
    }
    else {
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
                id_number={event.user.id_number}
                serial_num={event.performance.serial_num}
                key={event.performance._id}
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
