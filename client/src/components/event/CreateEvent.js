import React, { useState, Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { getUsers, getCourses } from '../../actions/eventsActions';
import Spinner from '../layout/Spinner';


export class CreateEvent extends Component {


  componentDidMount() {
    getUsers();
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
          <div id="event-tables" className="row">
            <div className="tables-matching text-center col-sm-6">
              <h3>{this.props.t.courses}</h3>
              <div id="courses-table" className="table-container text-center">
                <table>
                  <thead>
                    <tr>
                      <th>{this.props.t.course_title}</th>
                      <th>{this.props.t.serial_number}</th>
                      <th>{this.props.t.year}</th>
                      <th>{this.props.t.semester}</th>
                      <th>{this.props.t.course_hours}</th>
                      <th>{this.props.t.location}</th>
                    </tr>
                  </thead>
                  <tbody className={this.props.dir}>
                    {this.props.eventObj.courses.map(course => (
                      <tr key={course.serial_num}>
                        <td>{course.title}</td>
                        <td>{course.serial_num}</td>
                        <td>{course.year}</td>
                        <td>{course.semester}</td>
                        <td>{course.course_hours}</td>
                        <td>{course.location}</td>
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
                      <th>{this.props.t.first_name}</th>
                      <th>{this.props.t.last_name}</th>
                      <th>{this.props.t.id}</th>
                      <th>{this.props.t.email_address}</th>
                      <th>{this.props.t.user_color}</th>
                    </tr>
                  </thead>
                  <tbody className={this.props.dir}>
                    {this.props.eventObj.users.map(user => (
                      <tr key={user.email}>
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
        </Fragment>
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    eventObj: state.event,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(CreateEvent);