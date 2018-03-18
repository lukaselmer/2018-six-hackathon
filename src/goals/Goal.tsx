import * as React from 'react';
import * as db from '../interfaces/db';
import Comments from './Comments';

type P = { id: string, db: db.DBStructure };

export default class Goal extends React.Component<P> {
  render() {
    return (
      <div>
        <div>{this.goal && this.goal.name}</div>
        <div>
          <Comments
            comments={[
              { name: 'Marion', comment: 'I achieved my dream :D I am so happy!' },
              { name: 'Lukas', comment: 'Absolutely love it!' }
            ]}
          />
        </div>
      </div>
    );
  }

  private get goal() {
    return this.props.db.goals[this.props.id];
  }
}
