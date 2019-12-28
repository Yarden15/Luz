import React from 'react';
import './styles/App.scss';
//import Spinner from './components/layout/Spinner';
import Navbar from './components/layout/Navbar';
import ScheduleContainer from './components/schedule/ScheduleContainer';
import { Provider } from 'react-redux';
import store from './store'


const App = () => {

  return (
    <Provider store={store}>
      <div className='App'>
        <Navbar />
        <ScheduleContainer />
      </div>
    </Provider>
  );
}

export default App;
