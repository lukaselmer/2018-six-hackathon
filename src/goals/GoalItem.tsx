import * as React from 'react';
import * as db from '../interfaces/db';

type S = {};
type P = { goal: db.Goal };

export default class GoalItem extends React.Component<P, S> {
  render() {
    return (
      <div>
        <h3>{this.goal.name}</h3>
        <div>{this.goal.benefit}</div>
        <div>{this.goal.target}</div>
        <div>{this.goal.deadline}</div>
      </div>
    );
  }

  private get goal() {
    return this.props.goal;
  }
}
