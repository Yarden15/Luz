import { Draggable } from '@fullcalendar/interaction'; // needed for dayClick
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventsContainerActions';

export class eventsContainer extends Component {

  componentDidMount() {
    let draggableEl = document.getElementById('external-events');
    getEvents('123456789');
    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
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
    return (
      <div id='external-events'>
        <p>
          {' '}
          <strong>Courses</strong>{' '}
        </p>
        <div>
          {this.props.eventObj.events.map(event => (
            <div
              className='fc-event draggable'
              title={event.title}
              id={event.id}
              teacherid={event.teacherid}
              serial_num={event.serial_num}
              key={event.serial_num}
            >
              <div>{event.title} - {event.name}</div>
              <div>Id: {event.serial_num}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventObj: state.event
  };
};

export default connect(mapStateToProps)(eventsContainer);
