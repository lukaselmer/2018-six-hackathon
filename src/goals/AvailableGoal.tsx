import * as React from 'react';
import { AvailableGoal } from '../interfaces/db';

type S = {};
type P = { availableGoal: AvailableGoal };

export default class AvailableGoalComponent extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return <li>{this.props.availableGoal.goal.name}</li>;
  }
}
