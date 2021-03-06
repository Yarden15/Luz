import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { getCourses, toggleSelection, createEvent } from '../../actions/eventsActions';
import { getUsers } from '../../actions/userActions';
import Spinner from '../layout/Spinner';
import LoginAlert from '../auth/LoginAlert';
import { sortUsers, sortUsersByFirstName, sortUsersByLastName, sortUsersByID, sortUsersByEmail, sortUsersByColor, sortCourses, sortCourseByName, sortCourseBySN, sortCourseByYear, sortCourseBySemester, sortCourseByLocation, sortCourseByHours } from '../../actions/utilities';
import { loadUser } from '../../actions/authActions';


export class CreateEvent extends Component {
  componentDidMount() {
    !this.props.authObj.user && loadUser()
    getUsers();
    getCourses();
  }

  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      userId: ''
    };
  }

  render() {
    if (this.props.eventObj.loading || this.props.userObj.loading) {
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
          <div id="event-tables" className="row">
            <div className="tables-matching text-center col-sm-6">
              <h3>{this.props.t.courses}</h3>
              <div id="courses-table" className="table-container text-center">
                <table>
                  <thead>
                    <tr>
                      <th onClick={() => { sortCourses(sortCourseByName) }}>{this.props.t.course_title}</th>
                      <th onClick={() => { sortCourses(sortCourseBySN) }}>{this.props.t.serial_num}</th>
                      <th onClick={() => { sortCourses(sortCourseByYear) }}>{this.props.t.year}</th>
                      <th onClick={() => { sortCourses(sortCourseBySemester) }}>{this.props.t.semester}</th>
                      <th onClick={() => { sortCourses(sortCourseByLocation) }}>{this.props.t.location}</th>
                      <th onClick={() => { sortCourses(sortCourseByHours) }}>{this.props.t.course_hours}</th>
                    </tr>
                  </thead>
                  <tbody className={this.props.dir}>
                    {this.props.eventObj.courses.map(course => (
                      <tr key={course.serial_num} id={course._id}
                        onClick={() => {
                          toggleSelection(course._id, this.state.courseId);
                          this.state.courseId !== course._id ? this.setState({ courseId: course._id })
                            : this.setState({ courseId: '' });
                        }}>
                        <td>{course.title}</td>
                        <td>{course.serial_num}</td>
                        <td className="text-center">{this.props.t[course.year]}</td>
                        <td className="text-center">{this.props.t[course.semester]}</td>
                        <td>{course.location}</td>
                        <td className="text-center">{course.course_hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tables-matching text-center col-sm-6">
              <h3>{this.props.t.lecturers}</h3>
              <div id="courses-table" className="table-container text-center">
                <table>
                  <thead>
                    <tr >
                      <th onClick={() => { sortUsers(sortUsersByFirstName) }}>{this.props.t.first_name}</th>
                      <th onClick={() => { sortUsers(sortUsersByLastName) }}>{this.props.t.last_name}</th>
                      <th onClick={() => { sortUsers(sortUsersByID) }}>{this.props.t.id}</th>
                      <th onClick={() => { sortUsers(sortUsersByEmail) }}>{this.props.t.email_address}</th>
                      <th onClick={() => { sortUsers(sortUsersByColor) }}>{this.props.t.user_color}</th>
                    </tr>
                  </thead>
                  <tbody className={this.props.dir}>
                    {this.props.userObj.users.map(user => (user.lecturer &&
                      <tr key={user.email} id={user._id}
                        onClick={() => {
                          toggleSelection(user._id, this.state.userId);
                          this.state.userId === user._id ? this.setState({ userId: '' })
                            : this.setState({ userId: user._id });
                        }}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.id_number}</td>
                        <td>{user.email}</td>
                        <td style={{ background: user.color }}></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="center-alert center-horizontaly">
            <LoginAlert />
          </div>
          <button
            id="btn-tables"
            className='btn btn-primary btn-block center-horizontaly btn-nfm'
            onClick={() => { createEvent(this.state.userId, this.state.courseId) }}
          >{this.props.t.adjusting_lecturer_for_course}</button>
        </Fragment >
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    authObj: state.auth,
    eventObj: state.event,
    userObj: state.user,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(CreateEvent);