import * as React from 'react';
import * as db from '../interfaces/db';

type P = { id: string, db: db.DBStructure };

export default class Goal extends React.Component<P> {
  render() {
    return <div>{this.goal && this.goal.name}</div>;
  }

  private get goal() {
    return this.props.db.goals[this.props.id];
  }
}
