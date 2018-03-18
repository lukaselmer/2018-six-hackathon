import * as React from 'react';
import * as db from '../interfaces/db';
import SubscribedGoalItem from './SubscribedGoalItem';
import Card from 'material-ui/Card';

type P = { db: db.DBStructure };

export default class SubscribedGoals extends React.Component<P> {
  render() {
    return <div style={{ display: 'flex', flexFlow: 'row', flexWrap: 'wrap' }}>{this.subscribedGoals.map(sg => this.renderGoal(sg))}</div>;
  }

  private renderGoal(subscribedGoal: db.SubscribedGoal) {
    return (
      <div style={{ width: '50%' }} key={subscribedGoal.goalId}>
        <Card style={{ margin: '20px' }}>
          <SubscribedGoalItem goal={this.goal(subscribedGoal.goalId)} />
        </Card>
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
