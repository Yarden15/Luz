import React, { Component } from 'react';
import './App.css';
import Spinner from './components/layout/Spinner';
import Navbar from './components/layout/Navbar';
import Calander from './components/calander/Calander';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Calander />
      </div>
    );
  }
}

export default App;
