import React from 'react';
import { connect } from 'react-redux';
import { closePopup } from '../../actions/alertsActions';



const PopupMessage = props => {
  if (props.display) {
    return (
      <div id='popup-container' className={`popup-msg msg-${props.type} ${props.dir}`}>
        <i className="fas fa-times" onClick={closePopup}></i>
        <h4>{props.t[props.title]}</h4>
        <ol>
          {props.msg.map(message => (
            <li>{props.t[message]}</li>
          ))}
        </ol>

      </div>
    )
  }
  else {
    return null
  }
}

const mapStateToProps = state => {
  return {
    display: state.alerts.display,
    title: state.alerts.title,
    msg: state.alerts.msg,
    type: state.alerts.type,
    dir: state.literals.dir,
    t: state.literals.literals,
  };
};

export default connect(mapStateToProps)(PopupMessage);


