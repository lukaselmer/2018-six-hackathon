import * as React from 'react';
import { Comment as DBComment } from '../interfaces/db';
import { Card, List, ListItem } from 'material-ui';
import { ThumbUp } from 'material-ui-icons';

type P = { comments: DBComment[] };

export default class Comments extends React.Component<P> {
  render() {
    return (
      <div style={{ margin: '20px 0' }}>
        <Card>
          <List component="nav">{this.props.comments.map(c => this.renderComment(c))}</List>
        </Card>
      </div>
    );
  }

  private renderComment(comment: DBComment) {
    const isLast = this.props.comments.slice().reverse()[0] === comment;
    return (
      <ListItem divider={!isLast} key={comment.text}>
        <div style={{ width: '100%', display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
          <div>
            <img style={{ width: '39px', marginRight: '15px' }} src={comment.image} />
          </div>
          <div style={{ flexGrow: 1 }}>{comment.text}</div>
          <ThumbUp style={{ color: '#e91e63', marginRight: '10px' }} />
        </div>
      </ListItem>
    );
  }
}
