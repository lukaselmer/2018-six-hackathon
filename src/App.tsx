import * as React from 'react';
import './App.css';
import { database } from 'firebase';
import { AvailableGoal } from './interfaces/db';

const logo = require('./logo.svg');

type P = { availableGoals: AvailableGoal[] };

class App extends React.Component<{}, P> {
  constructor(props: {}) {
    super(props);
    this.state = { availableGoals: [] };
    database()
      .ref('/availableGoals')
      .on('value', snapshot => {
        if (!snapshot) return;
        const availableGoals: AvailableGoal[] = snapshot.val();
        this.setState({ availableGoals });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ul>{this.listItems()}</ul>
      </div>
    );
  }

  private listItems() {
    return this.state.availableGoals.map(goal => <li key={goal.goal.name}>{goal.goal.name}</li>);
  }
}

export default App;
