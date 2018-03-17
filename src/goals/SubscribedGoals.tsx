import * as React from 'react';
import * as db from '../interfaces/db';
import SubscribedGoalItem from './SubscribedGoalItem';
import Card from 'material-ui/Card';

type P = { db: db.DBStructure };

export default class SubscribedGoals extends React.Component<P> {
  render() {
    return <ul>{this.subscribedGoals.map(sg => this.renderGoal(sg))}</ul>;
  }

  private renderGoal(subscribedGoal: db.SubscribedGoal) {
    return (
      <div>
        <div key={subscribedGoal.goalId}>
          <Card style={{ width: '293px', height: '260px', backgroundColor: '#ffffff' }}>
            <SubscribedGoalItem goal={this.goal(subscribedGoal.goalId)} />
          </Card>
        </div>
        <div key={subscribedGoal.goalId}>
          <Card style={{ width: '293px', height: '260px', backgroundColor: '#ffffff' }}>
            <SubscribedGoalItem goal={this.goal(subscribedGoal.goalId)} />
          </Card>
        </div>
      </div>
    );
  }

  private get subscribedGoals() {
    return this.props.db.customers[0].subscribedGoals;
  }

  private goal(goalId: string) {
    return this.props.db.goals[goalId];
  }
}
