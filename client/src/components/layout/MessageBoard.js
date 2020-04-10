import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventsActions';
import { createNewMessage } from '../../actions/messagesActions';
import Spinner from '../layout/Spinner';

export class MessageBoard extends Component {
  componentDidMount() {
    getEvents();
  }
  render() {
    if (this.props.eventObj.loading) {
      return (
        <div id='schedules-spinner'>
          <Spinner />
        </div>
      )
    } else {
      return (
        <Fragment>
          <div id='board-title' >
            <h1>{this.props.t.message_board}</h1>
          </div>
          <div id="messages-board" className={`window ${this.props.dir}`} dir={this.props.dir}>
            <ul id="messages-list">
              {this.props.eventObj.events.map(event => (
                <Fragment>
                  <li style={{ color: event.user.color }} key={event.user._id}>{event.user.first_name} {event.user.last_name}</li>
                  <li style={{ color: event.user.color }} key={event.user._id}>{event.user.first_name} {event.user.last_name}</li>
                </Fragment>
              ))}
            </ul>
          </div>
          <button
            id="btn-tables"
            className='btn btn-primary btn-block center-horizontaly btn-nfm'
            onClick={() => { createNewMessage(); }}
          >{this.props.t.write_a_new_ad}</button>
        </Fragment>
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    eventObj: state.event,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(MessageBoard);
