import React from 'react';
import { connect } from 'react-redux';

const LoginAlert = props => {

    if (props.display) {
        if (props.dir === 'ltr') {
            return (
                <div id="login-alert" className={`${props.dir}`}>
                    <i className="fas fa-exclamation-triangle"></i> {props.t[props.msg]}
                </div>
            )
        } else {
            return (
                <div id="login-alert" className={`${props.dir}`}>
                    {props.t[props.msg]} <i className="fas fa-exclamation-triangle"></i>
                </div>
            )
        }
    }
    else {
        return null
    }
}

const mapStateToProps = state => {
    return {
        display: state.auth.displayAlert,
        msg: state.auth.error,
        dir: state.literals.dir,
        t: state.literals.literals
    };
};

export default connect(mapStateToProps)(LoginAlert);


