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
        <Card style={{ textAlign: 'center', marginTop: '30px' }}>
          <div style={{ background: '#b9b7b7', paddingTop: '20px', paddingBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={trophy} style={{ width: '55%', minWidth: '150px', maxWidth: '300px' }} />
            </div>
          </div>

          <CardContent style={{ color: '#4d4d4e' }}>
            <Typography variant="headline" component="h2" style={{ marginTop: '10px', fontSize: '20px' }}>
              Congratulations
            </Typography>
            <Typography
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '20px',
                fontSize: '20px',
                fontWeight: 300
              }}
            >
              <div style={{ maxWidth: '400px' }}>
                You reached your goal <span style={{ color: '#e91e63' }}>{this.goal.name}</span> and now you can live your dream
              </div>
            </Typography>
          </CardContent>

          <div className="TrophyButtons">
            <div style={{ margin: '5px 15px', minWidth: '204px' }}>
              <Button onClick={() => console.log('Redirect')} text="Share Your Success" />
            </div>
            <div style={{ margin: '5px 15px 0 15px', minWidth: '204px' }}>
              <Button onClick={() => console.log('Redirect')} text="Get Your Coupon" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  private get goal() {
    return this.props.db.goals[this.props.id];
  }
}
