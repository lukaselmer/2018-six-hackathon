import * as React from 'react';
import './App.css';
import SubscribedGoals from './goals/SubscribedGoals';
import Goals from './goals/Goals';
import Goal from './goals/Goal';
import { Route, Switch, Link } from 'react-router-dom';
import { database } from 'firebase';
import { DBStructure } from './interfaces/db';

type S = { db: DBStructure };

class App extends React.Component<{}, S> {
  firebaseRef: database.Reference;
  firebaseCallback: (a: firebase.database.DataSnapshot | null, b?: string) => string;

  componentDidMount() {
    this.firebaseRef = database().ref('/app');
    this.firebaseCallback = this.firebaseRef.on('value', snapshot => {
      if (!snapshot) return;
      const db: DBStructure = snapshot.val();
      this.setState({ db });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  render() {
    if (!this.state || !this.state.db) return 'Loading data, please wait...';

    return (
      <div className="App">
        <header>
          <ul>
            <li>
              <Link to={`/`}>Challenges</Link>
            </li>
            <li>
              <Link to={`/my-goals`}>My Goals</Link>
            </li>
          </ul>
        </header>
        <Switch>
          <Route exact={true} path="/" render={() => <Goals goals={this.state.db.goals} />} />
          <Route path="/goals/:id" render={props => this.renderGoal(props.match.params.id)} />
          <Route path="/my-goals" render={() => this.renderSubscribedGoals()} />
        </Switch>
      </div>
    );
  }

  private renderGoal(goalId: string) {
    return <Goal id={goalId} db={this.state.db as DBStructure} />;
  }

  private renderSubscribedGoals() {
    return <SubscribedGoals db={this.state.db as DBStructure} />;
  }
}

export default App;
