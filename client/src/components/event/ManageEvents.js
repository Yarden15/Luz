import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { getCourses, deleteEventAlert, getEvents } from '../../actions/eventsActions';
import Spinner from '../layout/Spinner';
import { getLocations } from '../../actions/adminActions';
import { getUsers } from '../../actions/userActions';
import { loadUser } from '../../actions/authActions';
import { sortEventByFirst, sortEvents, sortEventByLast, sortEventByID, sortEventBySN, sortEventByTitle, sortEventByYear, sortEventBySemester, sortEventByLocation, sortEventByHours, sortEventByColor } from '../../actions/utilities';

export class ManageEvents extends Component {
  componentDidMount() {
    !this.props.authObj.user && loadUser()
    getLocations();
    getCourses();
    getEvents();
    getUsers();
  }

  render() {
    if (this.props.eventObj.loading) {
      return (
        <Fragment>
          <Menu />
          <div id="tables-spinner">
            <Spinner />
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Menu />
          <div className="tables-matching  huge-table text-center">
            <h3>{this.props.t.manage_adjusting_lecturer_for_course}</h3>
            <div id="courses-table" className="table-container center-horizontaly text-center">
              <table>
                <thead>
                  <tr >
                    <th onClick={() => { sortEvents(sortEventByTitle) }}>{this.props.t.course_title}</th>
                    <th onClick={() => { sortEvents(sortEventBySN) }}>{this.props.t.serial_num}</th>
                    <th onClick={() => { sortEvents(sortEventByYear) }}>{this.props.t.year}</th>
                    <th onClick={() => { sortEvents(sortEventBySemester) }}>{this.props.t.semester}</th>
                    <th onClick={() => { sortEvents(sortEventByLocation) }}>{this.props.t.location}</th>
                    <th onClick={() => { sortEvents(sortEventByHours) }}>{this.props.t.course_hours}</th>
                    <th onClick={() => { sortEvents(sortEventByFirst) }}>{this.props.t.first_name}</th>
                    <th onClick={() => { sortEvents(sortEventByLast) }}>{this.props.t.last_name}</th>
                    <th onClick={() => { sortEvents(sortEventByID) }}>{this.props.t.id}</th>
                    <th onClick={() => { sortEvents(sortEventByColor) }}>{this.props.t.user_color}</th>
                    <th>{this.props.t.delete_event}</th>
                  </tr>
                </thead>
                <tbody className={this.props.dir}>
                  {this.props.eventObj.events.map(event => (
                    <tr key={event._id} id={event._id}>
                      <td>{event.performance.title}</td>
                      <td>{event.performance.serial_num}</td>
                      <td className="text-center">{this.props.t[event.performance.year]}</td>
                      <td className="text-center">{this.props.t[event.performance.semester]}</td>
                      <td>{event.performance.location}</td>
                      <td className="text-center">{event.performance.course_hours}</td>
                      <td>{event.user.first_name}</td>
                      <td>{event.user.last_name}</td>
                      <td>{event.user.id_number}</td>
                      <td style={{ background: event.user.color }}></td>
                      <td style={{ textAlign: 'center' }}>
                        <i className="far fa-trash-alt center-horizontaly"
                          onClick={() => { deleteEventAlert(event) }}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Link to='/createevent'>
            <button id="btn-tables"
              className='btn btn-primary btn-block center-horizontaly btn-nfm'
            > {this.props.t.adjusting_lecturer_for_course}
            </button>
          </Link>
        </Fragment >
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    eventObj: state.event,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(ManageEvents);