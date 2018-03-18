import * as React from 'react';
import { Goal } from '../interfaces/db';
import { Card, LinearProgress } from 'material-ui';

type P = { goal: Goal };

export default class Progress extends React.Component<P> {
  render() {
    return (
      <div style={{ margin: '20px 0' }}>
        <Card>
          <div style={{ display: 'flex', flexFlow: 'row', background: '#b9b7b7', padding: '20px' }}>
            <div style={{ flexGrow: 1 }}>
              <div
                style={{
                  fontSize: '25px',
                  letterSpacing: '-0.2px',
                  textAlign: 'right',
                  color: '#4d4d4e',
                  marginBottom: '8px'
                }}
              >
                {this.goal.target} CHF
              </div>
              <div>
                <LinearProgress
                  style={{
                    height: '20px',
                    borderRadius: '10.5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.66)'
                  }}
                  color="secondary"
                  variant="determinate"
                  value={this.goal.progress * 100}
                />
              </div>
              <div>
                <div>Funded</div>
                <div>Raised</div>
                <div>to Go</div>
                <div>Dreamers</div>
              </div>
            </div>
            <div style={{ width: '20%', minWidth: '100px' }}>
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
}
