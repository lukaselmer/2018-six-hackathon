import * as React from 'react';
import { Goal, SubscribedGoal } from '../interfaces/db';
import { Card, LinearProgress } from 'material-ui';

import './Progress.css';

type P = { goal: Goal; subscribedGoal: SubscribedGoal };

export default class Progress extends React.Component<P> {
  render() {
    return (
      <div style={{ margin: '20px 0' }}>
        <Card>
          <div style={{ display: 'flex', flexFlow: 'row', background: '#b9b7b7', padding: '30px 20px 20px 20px' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: '25px', letterSpacing: '-0.2px', textAlign: 'right', color: '#4d4d4e', marginBottom: '8px', paddingRight: '10px' }}>
                {this.goal.target} CHF
              </div>
              <div>
                <LinearProgress
                  style={{ height: '20px', borderRadius: '10.5px', backgroundColor: 'rgba(255, 255, 255, 0.66)' }}
                  color="secondary"
                  variant="determinate"
                  value={this.progress}
                />
              </div>
              <div className="ProgressGoalInfos">
                <div>
                  <div className="ProgressGoalInfoTitle">{this.progress} %</div>
                  <div>Funded</div>
                </div>
                <div className="ProgressGoalInfoBorderRight" />
                <div>
                  <div className="ProgressGoalInfoTitle">{this.saved} CHF</div>
                  <div>Saved</div>
                </div>
                <div className="ProgressGoalInfoBorderRight" />
                <div>
                  <div className="ProgressGoalInfoTitle">{this.subscribedGoal.remainingDays} Days</div>
                  <div>to Go</div>
                </div>
                <div className="ProgressGoalInfoBorderRight" />
                <div>
                  <div className="ProgressGoalInfoTitle">{this.goal.numberOfFollowers}</div>
                  <div>Dreamers</div>
                </div>
              </div>
            </div>
            <div style={{ width: '20%', minWidth: '100px', maxWidth: '170px', paddingLeft: '20px' }}>
              <img style={{ width: '100%' }} src={this.goal.image} />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  private get goal() {
    return this.props.goal;
  }

  private get subscribedGoal() {
    return this.props.subscribedGoal;
  }

  private get saved() {
    return Math.floor(this.goal.target * this.progress / 100);
  }

  private get progress() {
    return Math.floor(Math.min(100, this.subscribedGoal.progress));
  }
}
