import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import About from './components/pages/About';
import CoursePlacementPage from './components/pages/CoursePlacementPage';
import CreateUser from './components/users/CreateUser';
import CreateCourse from './components/event/CreateCourse';
import CreateEvent from './components/event/CreateEvent';
import ManageCourses from './components/event/ManageCourses';
import EditCourse from './components/event/EditCourse';
import ManageUsers from './components/users/ManageUsers';
import SubmitSchedule from './components/users/SubmitSchedule';
import EditUser from './components/users/EditUser';
import history from './utils/history';
import setAuthToken from './utils/setAuthToken';
import './styles/App.scss';
import PopupMessage from './components/alerts/PopupMessage';
import ManageLocations from './components/pages/ManageLocations';
import UserSettings from './components/users/UserSettings';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <PopupMessage />
        <div className='container'>
          <Switch>
            <Route exact path='/login' component={Login} history={history} />
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/settings' component={UserSettings} />
            <PrivateRoute exact path='/placement' component={CoursePlacementPage} />
            <PrivateRoute exact path='/createuser' component={CreateUser} />
            <PrivateRoute exact path='/createcourse' component={CreateCourse} />
            <PrivateRoute exact path='/managecourses' component={ManageCourses} />
            <PrivateRoute exact path='/manageusers' component={ManageUsers} />
            <PrivateRoute exact path='/edituser/:id' component={EditUser} />
            <PrivateRoute exact path='/editcourse/:id' component={EditCourse} />
            <PrivateRoute exact path='/createevent' component={CreateEvent} />
            <PrivateRoute exact path='/submitschedule' component={SubmitSchedule} />
            <PrivateRoute exact path='/managelocations' component={ManageLocations} />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default connect()(App);
