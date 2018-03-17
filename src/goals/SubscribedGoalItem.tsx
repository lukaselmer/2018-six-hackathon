import * as React from 'react';
import * as db from '../interfaces/db';
import { Link } from 'react-router-dom';

type S = {};
type P = { goal: db.Goal };

export default class GoalItem extends React.Component<P, S> {
  render() {
    return (
      <div>
        <h3>{this.goal.image}</h3>
        <div>{this.goal.benefit}</div>
        <div>
          <Link to={`/goals/${this.goal.id}`}>Details</Link>
        </div>
      </div>
    );
  }

  private get goal() {
    return this.props.goal;
  }
}
