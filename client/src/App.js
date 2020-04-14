import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import LecturerRoute from './components/routing/LecturerRoute';
import SchedulerRoute from './components/routing/SchedulerRoute';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import About from './components/pages/About';
import CoursePlacementPage from './components/pages/CoursePlacementPage';
import CreateUser from './components/users/CreateUser';
import CreateCourse from './components/event/CreateCourse';
import CreateEvent from './components/event/CreateEvent';
import ManageCourses from './components/event/ManageCourses';
import ManageEvents from './components/event/ManageEvents';
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
import AccessErrorPage from './components/pages/AccessErrorPage';


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
            <SchedulerRoute exact path='/placement' component={CoursePlacementPage} />
            <AdminRoute exact path='/createuser' component={CreateUser} />
            <AdminRoute exact path='/createcourse' component={CreateCourse} />
            <AdminRoute exact path='/managecourses' component={ManageCourses} />
            <AdminRoute exact path='/manageevents' component={ManageEvents} />
            <AdminRoute exact path='/manageusers' component={ManageUsers} />
            <AdminRoute exact path='/edituser/:id' component={EditUser} />
            <AdminRoute exact path='/editcourse/:id' component={EditCourse} />
            <AdminRoute exact path='/createevent' component={CreateEvent} />
            <LecturerRoute exact path='/submitschedule' component={SubmitSchedule} />
            <AdminRoute exact path='/managelocations' component={ManageLocations} />
            <Route exact path='/accesserror' component={AccessErrorPage} />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default connect()(App);
