import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const MessageBoard = (props) => {
  return (
    <Fragment>
      <div id='board-title' >
        <h1>{props.t.message_board}</h1>
      </div>
      <div className='window'>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(MessageBoard);
