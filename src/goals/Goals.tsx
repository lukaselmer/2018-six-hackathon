import * as React from 'react';
import { database } from 'firebase';
import * as db from '../interfaces/db';
import GoalItem from './GoalItem';

type S = { goals: db.Goal[] };

export default class GoalComponent extends React.Component<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = { goals: [] };
    database()
      .ref('/goals')
      .on('value', snapshot => {
        if (!snapshot) return;
        const goals: db.Goal[] = snapshot.val();
        this.setState({ goals });
      });
  }

  render() {
    return Object.keys(this.state.goals).map(key => (
      <GoalItem goal={this.state.goals[key]} key={key}>
        {this.state.goals[key].name}
      </GoalItem>
    ));
  }
}
