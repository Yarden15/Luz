import React, { Component } from 'react';
import './App.css';
//import Spinner from './components/layout/Spinner';
import Navbar from './components/layout/Navbar';
import ScheduleItem from './components/calendar/ScheduleItem';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <ScheduleItem />
      </div>
    );
  }
}

export default App;
