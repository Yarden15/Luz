import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const AccessErrorPage = props => {
  // Load user in this component

  return (
    <Fragment>
      <div>
        <h1>You do not have access to this page</h1>
        <Link to='/'>
          <button id="btn-tables"
            className='btn btn-primary btn-block center-horizontaly btn-nfm'
          > Back to home page
            </button>
        </Link>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(AccessErrorPage);
