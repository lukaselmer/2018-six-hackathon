import * as React from 'react';
import * as db from '../interfaces/db';
import { Card, Typography, CardContent } from 'material-ui';
import Button from './Button';
import './Trophy.css';

const trophy = require('./trophy.png');

type P = { id: string; db: db.DBStructure };

export default class Trophy extends React.Component<P> {
  render() {
    return (
      <div>
        <Card className="GoalItemCard" style={{ textAlign: 'center' }}>
          <div style={{ background: '#b9b7b7', paddingTop: '20px', paddingBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={trophy} style={{ width: '30%', minWidth: '150px', marginTop: '80px', marginBottom: '80px' }} />
            </div>
          </div>

          <CardContent style={{ color: '#4d4d4e' }}>
            <Typography variant="headline" component="h2" style={{ margin: '30px 0 0 25px', fontSize: '40px' }}>
              Congratulations
            </Typography>
            <Typography
              style={{ marginTop: '40px', fontSize: '20px', fontWeight: 300, maxWidth: '40%', marginLeft: '30%', marginRight: '30%' }}
            >
              You reached your goal <span style={{ color: '#e91e63' }}>{this.goal.name}</span> and now you can live your dream
            </Typography>
          </CardContent>

          <div className="TrophyButtons">
            <div style={{ margin: '15px', minWidth: '204px' }}>
              <Button onClick={() => console.log('Redirect')} text="Share Your Success" />
            </div>
            <div style={{ margin: '15px', minWidth: '204px' }}>
              <Button onClick={() => console.log('Redirect')} text="Get Your Coupon" />
            </div>
          </div>
        </Card>;
      </div>
    );
  }

  private get goal() {
    return this.props.db.goals[this.props.id];
  }
}
