import * as React from 'react';
import './App.css';
import SubscribedGoals from './goals/SubscribedGoals';
import Goals from './goals/Goals';
import Goal from './goals/Goal';
import { Route, Switch, Link } from 'react-router-dom';

class App extends React.Component {
  render() {
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
          <Route exact={true} path="/" component={Goals} />
          <Route path="/goals/:id" component={Goal} />
          <Route path="/my-goals" component={SubscribedGoals} />
          {/* <Route path="/schedule" component={Schedule} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
