import * as React from 'react';
import * as db from '../interfaces/db';
import GoalItem from './GoalItem';
import Comments from './Comments';

type P = { db: db.DBStructure };

export default class SubscribedGoals extends React.Component<P> {
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
          <div>
            <Comments
              comments={[
                { name: 'Marion', comment: 'I achieved my dream :D I am so happy!' },
                { name: 'Lukas', comment: 'Absolutely love it!'}
              ]}
            />
          </div>
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
