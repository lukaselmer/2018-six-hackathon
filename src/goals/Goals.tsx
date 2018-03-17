import * as React from 'react';
import { database } from 'firebase';
import * as db from '../interfaces/db';
import GoalItem from './GoalItem';

type P = { goals: db.Goals };

export default class GoalComponent extends React.Component<P> {
  firebaseRef: database.Reference;
  firebaseCallback: (a: firebase.database.DataSnapshot | null, b?: string) => string;

  render() {
    return Object.keys(this.props.goals).map(key => (
      <GoalItem goal={this.props.goals[key]} key={key}>
        {this.props.goals[key].name}
      </GoalItem>
    ));
  }
}
