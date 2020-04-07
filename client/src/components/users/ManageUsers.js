import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { getUsers, deleteUserAlert, resetPasswordAlert,handleResetPassword } from '../../actions/userActions';
import Spinner from '../layout/Spinner';

export class ManageUsers extends Component {
  componentDidMount() {
    getUsers();
  }

  render() {
    if (this.props.userObj.loading) {
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
            <h3>{this.props.t.manage_users}</h3>
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
                    <th>{this.props.t.reset_password}</th>
                  </tr>
                </thead>
                <tbody className={this.props.dir}>
                  {this.props.userObj.users.map(user => (
                    <tr key={user.email} id={user._id}>
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
                        <Link to={`/edituser/${user._id}`}>
                          <i className="fas fa-pencil-alt center-horizontaly">
                          </i>
                        </Link>
                      </td>
                      <td style={{ textAlign: 'center' }}><i className="fas fa-key center-horizontaly" onClick={() => { handleResetPassword(user._id) }}></i></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Link to='/createuser'>
            <button id="btn-tables"
              className='btn btn-primary btn-block center-horizontaly btn-nfm'
            > {this.props.t.create_user}
            </button>
          </Link>
        </Fragment >
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    userObj: state.user,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(ManageUsers);