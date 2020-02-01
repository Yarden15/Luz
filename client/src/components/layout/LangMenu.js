import React from 'react';
import { connect } from 'react-redux';
import { defineLang } from '../../actions/literalActions';

const LangMenu = props => {
    if (props.display) {
        return (
            <div id="lang-menu" className={`triangle-isosceles ${props.class}`}>
                <ul>
                    <li onClick={() => { defineLang('en') }}>
                        <i className="fas fa-check" style={{ visibility: props.lang === 'en' ? 'visible' : 'hidden' }}>
                        </i> English
                    </li>
                    <li onClick={() => { defineLang('he') }}>
                        <i className="fas fa-check" style={{ visibility: props.lang === 'he' ? 'visible' : 'hidden' }} >
                        </i> עברית
                    </li>
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


