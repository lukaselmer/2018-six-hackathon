import * as React from 'react';
import * as db from '../interfaces/db';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardMedia, Typography, CardContent } from 'material-ui';
import { withRouter } from 'react-router';
import Button from './Button';
import './GoalItem.css';

type S = {};
type P = { goal: db.Goal };

class GoalItem extends React.Component<RouteComponentProps<P> & P, S> {
  render() {
    return (
      <div className="GoalItem">
        <Card className="GoalItemCard">
          <CardMedia image={this.goal.image} />
          <CardContent>
            <Typography gutterBottom={true} variant="headline" component="h2">
              {this.goal.name}
            </Typography>
            <Typography component="div">
              <div style={{ textAlign: 'center' }}>
                <img src={this.goal.image} style={{ width: '30%', minWidth: '150px' }} />
              </div>
              <div>{this.goal.benefit}</div>
              <div>{this.goal.target} CHF</div>
              <div>Valid until {this.goal.deadline}</div>
              <div style={{ textAlign: 'center', margin: '20px 10% 0 10%' }}>
                <Button onClick={() => this.props.history.push(`/goals/${this.goal.id}`)} text="START DREAMING" />
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
