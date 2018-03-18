import * as React from 'react';
import { Comment as DBComment } from '../interfaces/db';

type P = { comments: DBComment[] };

export default class Comments extends React.Component<P> {
  render() {
    return <div>{this.props.comments.map(c => this.renderComment(c))}</div>;
  }

  renderComment(comment: DBComment) {
    return (
      <div>
        <div>
          <img src={comment.image} />
        </div>
        <div>{comment.text}</div>
      </div>
    );
  }
}
