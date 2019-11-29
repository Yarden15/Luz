import React, { Component } from 'react';
import './App.css';
import Spinner from './components/layout/Spinner';
import Navbar from './components/layout/Navbar';
import Calendar from './components/calander/Calendar';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Calendar />
      </div>
    );
  }
}

export default App;
