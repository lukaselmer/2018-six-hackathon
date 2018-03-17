import * as React from 'react';
import { database } from 'firebase';
import * as db from '../interfaces/db';
import GoalItem from './GoalItem';

type S = { goals: db.Goal[] };

export default class GoalComponent extends React.Component<{}, S> {
  firebaseRef: database.Reference;
  firebaseCallback: (a: firebase.database.DataSnapshot | null, b?: string) => string;

  constructor(props: {}) {
    super(props);
    this.state = { goals: [] };
  }

  componentDidMount() {
    this.firebaseRef = database().ref('/goals');
    this.firebaseCallback = this.firebaseRef.on('value', snapshot => {
      if (!snapshot) return;
      const goals: db.Goal[] = snapshot.val();
      this.setState({ goals });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  render() {
    return Object.keys(this.state.goals).map(key => (
      <GoalItem goal={this.state.goals[key]} key={key}>
        {this.state.goals[key].name}
      </GoalItem>
    ));
  }
}
