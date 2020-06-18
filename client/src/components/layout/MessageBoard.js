import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/eventsActions';
import { createNewMessage, getAds, deleteAdAlert} from '../../actions/messagesActions';
import Spinner from '../layout/Spinner';
import { createEmailAlert } from '../../actions/adminActions';

export class MessageBoard extends Component {
  componentDidMount() {
    getEvents();
    getAds()
  }
  render() {
    if (this.props.eventObj.loading || this.props.authObj.loading) {
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
              {this.props.ads.messages.map(ad => (
                <li key={ad._id} style={{ color: ad.user.color }}>
                  {(this.props.authObj.user._id === ad.user._id || this.props.authObj.user.manager) && <i onClick={() => { deleteAdAlert(ad._id) }} className="far fa-trash-alt ads-icon"></i>}
                  {ad.user.first_name} {ad.user.last_name}: {ad.content} </li>
              ))}
            </ul>
          </div>
          {(this.props.authObj.user.scheduler || this.props.authObj.user.manager) && <Fragment> <button
            id="btn-tables"
            className='btn btn-primary btn-block center-horizontaly btn-nfm'
            onClick={() => { createNewMessage(); }}
          >{this.props.t.write_a_new_ad}</button>
            <button
              id="btn-tables"
              className='btn btn-primary btn-block center-horizontaly btn-nfm'
              onClick={() => { createEmailAlert(); }}
            >{this.props.t.send_email}</button></Fragment>}
        </Fragment>
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    ads: state.ads,
    eventObj: state.event,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(MessageBoard);
