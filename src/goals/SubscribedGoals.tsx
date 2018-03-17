import * as React from 'react';
import { database } from 'firebase';
import * as db from '../interfaces/db';
import GoalItem from './GoalItem';

type S = { subscribedGoals: db.SubscribedGoal[]; goals: db.Goals };

export default class SubscribedGoals extends React.Component<{}, S> {
  firebaseRefSubscribedGoals: database.Reference;
  firebaseCallbackSubscribedGoals: (a: firebase.database.DataSnapshot | null, b?: string) => string;
  firebaseRefGoals: database.Reference;
  firebaseCallbackGoals: (a: firebase.database.DataSnapshot | null, b?: string) => string;

  constructor(props: {}) {
    super(props);
    this.state = { subscribedGoals: [], goals: {} };
  }

  componentDidMount() {
    // TODO: user login instead of taking user #0
    this.firebaseRefSubscribedGoals = database().ref('/customers/0/subscribedGoals');
    this.firebaseCallbackSubscribedGoals = this.firebaseRefSubscribedGoals.on('value', snapshot => {
      if (!snapshot) return;
      const subscribedGoals: db.SubscribedGoal[] = snapshot.val();

      this.firebaseRefGoals = database().ref('/goals');
      this.firebaseCallbackGoals = this.firebaseRefGoals.on('value', goalsSnapshot => {
        if (!goalsSnapshot) return;
        const goals: db.Goals = goalsSnapshot.val();
        this.setState({ subscribedGoals, goals });
      });
    });
  }

  componentWillUnmount() {
    this.firebaseRefSubscribedGoals.off('value', this.firebaseCallbackSubscribedGoals);
    if (this.firebaseRefGoals) this.firebaseRefGoals.off('value', this.firebaseCallbackGoals);
  }

  render() {
    return <ul>{this.subscribedGoals.map(sg => this.renderGoal(sg))}</ul>;
  }

  private renderGoal(subscribedGoal: db.SubscribedGoal) {
    return (
      <div key={subscribedGoal.goalId}>
        <GoalItem goal={this.goal(subscribedGoal.goalId)} />
        <h4>Additional Info</h4>
        <div>
          <div>{subscribedGoal.actualBalance}</div>
          <div>{subscribedGoal.progress}</div>
          <div>{subscribedGoal.startingAt}</div>
          <div>{subscribedGoal.startingBalance}</div>
          <div>{subscribedGoal.goalId}</div>
        </div>
      </div>
    );
  }

  private get subscribedGoals() {
    return this.state.subscribedGoals;
  }

  private goal(goalId: string) {
    return this.state.goals[goalId];
  }
}
