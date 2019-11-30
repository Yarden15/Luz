import React, { Component } from 'react';
import './App.css';
//import Spinner from './components/layout/Spinner';
import Navbar from './components/layout/Navbar';
import Schedule from './components/calander/Schedule';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Schedule />
      </div>
    );
  }
}

export default App;
