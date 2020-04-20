import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { getCourses, deleteCourseAlert } from '../../actions/eventsActions';
import Spinner from '../layout/Spinner';
import { getLocations } from '../../actions/adminActions';
import { loadUser } from '../../actions/authActions';
import { sortCourses, sortCourseByName, sortCourseBySN, sortCourseByYear, sortCourseBySemester, sortCourseByLocation, sortCourseByHours } from '../../actions/utilities';

export class ManageCourses extends Component {
  componentDidMount() {
    !this.props.authObj.user && loadUser()
    getLocations();
    getCourses();
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
          <div className="tables-matching  large-table text-center">
            <h3>{this.props.t.manage_courses}</h3>
            <div id="courses-table" className="table-container center-horizontaly text-center">
              <table>
                <thead>
                  <tr >
                    <th draggable="true" onDragStart={()=>{console.log('drag')}} onClick={() => { sortCourses(sortCourseByName) }}>{this.props.t.course_title}</th>
                    <th onClick={() => { sortCourses(sortCourseBySN) }}>{this.props.t.serial_num}</th>
                    <th onClick={() => { sortCourses(sortCourseByYear) }}>{this.props.t.year}</th>
                    <th onClick={() => { sortCourses(sortCourseBySemester) }}>{this.props.t.semester}</th>
                    <th onClick={() => { sortCourses(sortCourseByLocation) }}>{this.props.t.location}</th>
                    <th onClick={() => { sortCourses(sortCourseByHours) }}>{this.props.t.course_hours}</th>
                    <th>{this.props.t.edit_course}</th>
                    <th>{this.props.t.delete_course}</th>
                  </tr>
                </thead>
                <tbody className={this.props.dir}>
                  {this.props.eventObj.courses.map(course => (
                    <tr key={course._id} id={course._id}>
                      <td>{course.title}</td>
                      <td>{course.serial_num}</td>
                      <td className="text-center">{this.props.t[course.year]}</td>
                      <td className="text-center">{this.props.t[course.semester]}</td>
                      <td>{course.location}</td>
                      <td className="text-center">{course.course_hours}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Link to={`/editcourse/${course._id}`}>
                          <i className="fas fa-pencil-alt center-horizontaly">
                          </i>
                        </Link>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <i className="far fa-trash-alt center-horizontaly"
                          onClick={() => { deleteCourseAlert(course) }}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Link to='/createcourse'>
            <button id="btn-tables"
              className='btn btn-primary btn-block center-horizontaly btn-nfm'
            > {this.props.t.create_course}
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

export default connect(mapStateToProps)(ManageCourses);