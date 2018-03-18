import * as React from 'react';
import * as db from '../interfaces/db';
import Comments from './Comments';

type P = { id: string; db: db.DBStructure };

export default class Goal extends React.Component<P> {
  render() {
    return (
      <div>
        <div>{this.goal && this.goal.name}</div>
        <div>
          <Comments comments={this.goal.comments} />
        </div>
      </div>
    );
  }

  private get goal() {
    console.log(this.props.db.goals[this.props.id]);
    return this.props.db.goals[this.props.id];
  }
}
