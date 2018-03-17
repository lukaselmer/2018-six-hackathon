import * as React from 'react';
import { database } from 'firebase';
import * as db from '../interfaces/db';

type S = { goal: db.Goal | undefined };

export default class Goal extends React.Component<{}, S> {
  firebaseRef: database.Reference;
  firebaseCallback: (a: firebase.database.DataSnapshot | null, b?: string) => string;

  constructor(props: {}) {
    super(props);
    this.state = { goal: undefined };
  }

  componentDidMount() {
    this.firebaseRef = database().ref('/goals/a53434534');
    this.firebaseCallback = this.firebaseRef.on('value', snapshot => {
      if (!snapshot) return;
      const goal: db.Goal = snapshot.val();
      this.setState({ goal });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  render() {
    return <div>{this.goal && this.goal.name}</div>;
  }

  private get goal() {
    return this.state.goal;
  }
}
