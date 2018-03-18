import * as React from 'react';
import * as db from '../interfaces/db';
import Comments from './Comments';
import Coupons from './Coupons';
import Progress from './Progress';
import Trophy from './Trophy';

type P = { id: string; db: db.DBStructure };

export default class Goal extends React.Component<P> {
  render() {
    return (
      <div>
        {this.subscribedGoal &&
          this.subscribedGoal.progress >= 99.99 && (
            <div>
              <Trophy id={this.props.id} db={this.props.db} />
            </div>
          )}
        {this.subscribedGoal && (
          <div>
            <Progress goal={this.goal} subscribedGoal={this.subscribedGoal} />
          </div>
        )}
        <div>
          <Coupons coupons={this.goal.coupons} />
        </div>
        <div>
          <Comments comments={this.goal.comments} />
        </div>
      </div>
    );
  }

  private get goal() {
    return this.props.db.goals[this.props.id];
  }

  private get subscribedGoal() {
    return this.props.db.customers[0].subscribedGoals.find(el => el.goalId === this.goal.id);
  }
}
