import * as React from 'react';
import * as db from '../interfaces/db';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';

type S = {};
type P = { goal: db.Goal };

class SubscribedGoalItem extends React.Component<RouteComponentProps<P> & P, S> {
  render() {
    return (
      <div style={{ cursor: 'pointer' }} onClick={() => this.props.history.push(`/goals/${this.goal.id}`)} key={this.goal.id}>
        <div style={{ textAlign: 'center' }}>
          <img style={{ width: '50%', marginTop: '10px', height: 'auto', objectFit: 'contain' }} src={this.goal.image} />
        </div>
        <div style={{ textAlign: 'center', color: '#e91e63', paddingTop: '20px', paddingBottom: '20px', fontSize: '40px' }}>
          {this.goal.benefit}
        </div>
      </div>
    );
  }

  private get goal() {
    return this.props.goal;
  }
}

export default withRouter(SubscribedGoalItem);
