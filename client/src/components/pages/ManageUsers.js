import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { getUsers, getCourses, toggleSelection, createEvent, deleteUserAlert } from '../../actions/eventsActions';
import Spinner from '../layout/Spinner';
import LoginAlert from '../auth/LoginAlert';


export class ManageUsers extends Component {
  componentDidMount() {
    getUsers();
  }

  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      userId: ''
    };
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
          <div className="tables-matching text-center">
            <h3>{this.props.t.lecturers}</h3>
            <div id="courses-table" className="table-container center-horizontaly text-center">
              <table>
                <thead>
                  <tr >
                    <th>{this.props.t.first_name}</th>
                    <th>{this.props.t.last_name}</th>
                    <th>{this.props.t.id}</th>
                    <th>{this.props.t.email_address}</th>
                    <th>{this.props.t.user_color}</th>
                    <th>{this.props.t.delete_user}</th>
                    <th>{this.props.t.edit_user}</th>
                  </tr>
                </thead>
                <tbody className={this.props.dir}>
                  {this.props.eventObj.users.map(user => (
                    <tr key={user.email} id={user._id}
                      onClick={() => {
                        console.log(user);
                      }}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.id_number}</td>
                      <td>{user.email}</td>
                      <td style={{ background: user.color }}></td>
                      <td style={{ textAlign: 'center' }}>
                        <i className="far fa-trash-alt center-horizontaly"
                          onClick={() => { deleteUserAlert(user) }}></i>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <i className="fas fa-pencil-alt center-horizontaly"
                          onClick={() => { console.log(user) }}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <button
            id="btn-tables"
            className='btn btn-primary btn-block center-horizontaly btn-nfm'
            onClick={() => { createEvent(this.state.userId, this.state.courseId) }}
          >{this.props.t.create_course}</button> */}
        </Fragment >
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

export default connect(mapStateToProps)(ManageUsers);