import React, { Component } from 'react';
import './App.css';
//import Spinner from './components/layout/Spinner';
import Navbar from './components/layout/Navbar';
import ScheduleContainer from './components/calendar/ScheduleContainer';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <ScheduleContainer />
      </div>
    );
  }
}
export default App;
