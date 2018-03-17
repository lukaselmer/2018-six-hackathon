import * as React from 'react';
import './App.css';
import Goals from './goals/Goals';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Goals />
      </div>
    );
  }
}

export default App;
