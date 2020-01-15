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

        return {
          title: title,
          id: id,
          extendedProps: {
            teacherId: '',
            schedId: ''
          }
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
              className='fc-event druggable'
              title={event.title}
              id={event.id}
              extendedprops={event.extendedprops}
              key={event.id}
            >
              <div>{event.title}</div>
              <div>Id: {event.id}</div>
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
