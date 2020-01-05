import { Draggable } from '@fullcalendar/interaction' // needed for dayClick
import React, { Component } from 'react'

export class eventsContainer extends Component {

  state = {
    events: []
  };

  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id
        };
      }
    });
  }

  render() {
    return (
      <div id="external-events">
        <p> <strong>Courses</strong> </p>
        <div>
          {this.state.events.map(event => (
            <div className="fc-event druggable" title={event.title} data={event.id} key={event.id}>
              {event.title}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default eventsContainer
