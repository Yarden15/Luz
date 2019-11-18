import React, {Fragment, Component} from 'react';
import './App.css';
import Spinner from './components/layout/Spinner';

class App extends Component {

  render() {
    return (
      <Fragment className="App">
           <Spinner />
      </Fragment>
    );

  }
}

export default App;
