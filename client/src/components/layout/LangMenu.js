import React from 'react';
import { connect } from 'react-redux';
import { defineLang } from '../../actions/literalActions';

const LangMenu = props => {
    if (props.display) {
        return (
            <div id="lang-menu" className="triangle-isosceles">
                <ul>
                    <li> <i className="fas fa-check" ></i> English </li>
                    <li>{props.lang === 'he' && <i className="fas fa-check"></i>} עברית </li>
                </ul>
            </div>
        );
    } else {
        return null;
    }
};

const mapStateToProps = state => {
    return {
        display: state.literals.displayMenu,
        lang: state.literals.lang
    };
};

export default connect(mapStateToProps)(LangMenu);


