import * as React from 'react';
import { database } from 'firebase';
import * as db from '../interfaces/db';
import AvailableGoal from './AvailableGoal';

type S = { availableGoals: db.AvailableGoal[] };

export default class AvailableGoalComponent extends React.Component<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = { availableGoals: [] };
    database()
      .ref('/availableGoals')
      .on('value', snapshot => {
        if (!snapshot) return;
        const availableGoals: db.AvailableGoal[] = snapshot.val();
        this.setState({ availableGoals });
      });
  }

  render() {
    return <ul>{this.listItems()}</ul>;
  }

  private listItems() {
    return this.state.availableGoals.map(goal => (
      <AvailableGoal availableGoal={goal} key={goal.goal.name}>
        {goal.goal.name}
      </AvailableGoal>
    ));
  }
}
