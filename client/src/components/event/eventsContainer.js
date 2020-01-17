import { Draggable } from '@fullcalendar/interaction'; // needed for dayClick
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class eventsContainer extends Component {

  componentDidMount() {
    let draggableEl = document.getElementById('external-events');
    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        let title = eventEl.getAttribute('title');
        let id = eventEl.getAttribute('id');
        let teacherid = eventEl.getAttribute('teacherid');
        let courseid = eventEl.getAttribute('courseid');

        return {
          title: title,
          id: id,
          teacherid: teacherid,
          courseid: courseid,
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
              courseid={event.courseid}
              key={event.courseid}
            >
              <div>{event.title}</div>
              <div>Id: {event.courseid}</div>
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
