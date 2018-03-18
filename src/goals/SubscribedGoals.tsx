import * as React from 'react';
import * as db from '../interfaces/db';
import SubscribedGoalItem from './SubscribedGoalItem';
import Card from 'material-ui/Card';
const plus = require('./plus.png');
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';

type P = { db: db.DBStructure };

class SubscribedGoals extends React.Component<RouteComponentProps<P> & P> {
  render() {
    return (
      <div>
        <div style={{ display: 'flex', flexFlow: 'row', flexWrap: 'wrap' }}>{this.subscribedGoals.map(sg => this.renderGoal(sg))}</div>
        <div style={{ display: 'flex', flexFlow: 'row', flexWrap: 'wrap' }}>{this.renderNewGoal()}</div>
      </div>
    );
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

  private renderNewGoal() {
    return (
      <div onClick={() => this.props.history.push(`/`)} style={{ width: '50%', cursor: 'pointer' }}>
        <Card style={{ margin: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <img style={{ width: '45%', paddingTop: '30px', height: 'auto', objectFit: 'contain' }} src={plus} />
          </div>
          <div style={{ textAlign: 'center', color: '#e91e63', paddingTop: '20px', paddingBottom: '20px', fontSize: '40px' }}>
            Add new Dream
          </div>
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

export default withRouter(SubscribedGoals);