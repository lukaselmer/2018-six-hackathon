import * as React from 'react';

type P = { comments: { name: string; comment: string }[] };

export default class Comments extends React.Component<P> {
  render() {
    return (
      <div>
        <div>{this.props.comments[0].name}</div>
        <div>{this.props.comments[0].comment}</div>
        <div>{this.props.comments[1].name}</div>
        <div>{this.props.comments[1].comment}</div>
      </div>
    );
  }
}
