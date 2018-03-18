import * as React from 'react';
import * as db from '../interfaces/db';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Typography, CardContent } from 'material-ui';
import { withRouter } from 'react-router';
import Button from './Button';
import './GoalItem.css';
import { Event, EuroSymbol } from 'material-ui-icons';

type S = {};
type P = { goal: db.Goal };

class GoalItem extends React.Component<RouteComponentProps<P> & P, S> {
  render() {
    return (
      <div className="GoalItem">
        <Card className="GoalItemCard">
          <div
            style={{
              background: '#b9b7b7',
              paddingTop: '20px',
              paddingBottom: '20px'
            }}
          >
            <div
              style={{
                marginBottom: '20px',
                marginLeft: '-16px',
                width: '180px',
                height: '49px',
                backgroundColor: '#fd5491',
                boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)'
              }}
            >
              <div
                style={{
                  padding: '4px 7px',
                  fontSize: this.goal.benefit.length <= 8 ? '35px' : '16px',
                  fontWeight: 900,
                  fontStyle: 'normal',
                  fontStretch: 'normal',
                  lineHeight: 'normal',
                  letterSpacing: '-0.4px',
                  textAlign: 'left',
                  color: 'rgba(255, 255, 255, 0.87)'
                }}
              >
                {this.goal.benefit}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={this.goal.image} style={{ width: '30%', minWidth: '150px' }} />
            </div>
            <Typography
              gutterBottom={true}
              variant="headline"
              component="h2"
              style={{
                margin: '10px 0 0 25px',
                color: 'rgba(255, 255, 255, 0.87)'
              }}
            >
              {this.goal.name}
            </Typography>
          </div>

          <CardContent>
            <Typography component="div">
              <div style={{ paddingTop: '30px', display: 'flex', flexFlow: 'row' }}>
                <div style={{ padding: '0 40px 0 20px', color: '#ec407a' }}>
                  <Event />
                </div>
                <div style={{ flexGrow: 1, padding: '0 20px 20px 0', borderBottom: 'solid 1px #dddddd' }}>{this.goal.target} CHF</div>
              </div>
              <div style={{ paddingTop: '20px', display: 'flex', flexFlow: 'row' }}>
                <div style={{ padding: '0 40px 0 20px', color: '#ec407a' }}>
                  <EuroSymbol />
                </div>
                <div style={{ flexGrow: 1, padding: '0 20px 20px 0', borderBottom: 'solid 1px #dddddd' }}>
                  Valid until {this.goal.deadline}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline', textAlign: 'center', marginTop: '20px', width: '70%' }}>
                  <Button onClick={() => this.props.history.push(`/goals/${this.goal.id}`)} text="START DREAMING" />
                </div>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  private get goal() {
    return this.props.goal;
  }
}

export default withRouter(GoalItem);
