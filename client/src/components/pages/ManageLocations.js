import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../layout/Menu';
import { getLocations, deleteLocationAlert, createLocationAlert } from '../../actions/adminActions';
import Spinner from '../layout/Spinner';

export class ManageLocations extends Component {
  componentDidMount() {
    getLocations();
  }

  render() {
    if (this.props.adminObj.loading) {
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
            <h3>{this.props.t.manage_locations}</h3>
            <div id="courses-table" className="table-container center-horizontaly text-center">
              <table>
                <thead>
                  <tr >
                    <th>{this.props.t.name}</th>
                    <th>{this.props.t.delete_location}</th>
                  </tr>
                </thead>
                <tbody className={this.props.dir}>
                  {this.props.adminObj.locations.map(location => (
                    <tr key={location._id} id={location._id}>
                      <td>{location.name}</td>
                      <td style={{ textAlign: 'center' }}>
                        <i className="far fa-trash-alt center-horizontaly"
                          onClick={() => { deleteLocationAlert(location) }}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button id="btn-tables" onClick={() => { createLocationAlert() }}
            className='btn btn-primary btn-block center-horizontaly btn-nfm'
          > {this.props.t.add_location}
          </button>
        </Fragment >
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    adminObj: state.admin,
    t: state.literals.literals,
    dir: state.literals.dir
  };
};

export default connect(mapStateToProps)(ManageLocations);