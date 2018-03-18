import * as React from 'react';
import * as db from '../interfaces/db';
import { Link } from 'react-router-dom';

type S = {};
type P = { goal: db.Goal };

export default class SubscribedGoalItem extends React.Component<P, S> {
  render() {
    return (
      <div key={this.goal.id}>
        <div style={{ textAlign: 'center' }}>
          <img style={{ width: '50%', marginTop: '10px', height: 'auto', objectFit: 'contain' }} src={this.goal.image} />
        </div>
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
