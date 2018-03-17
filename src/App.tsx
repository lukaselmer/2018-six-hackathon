import * as React from 'react';
import './App.css';
import AvailableGoals from './goals/AvailableGoals';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AvailableGoals />
      </div>
    );
  }
}

export default App;
