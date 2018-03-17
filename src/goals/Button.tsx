import * as React from 'react';
import { Button } from 'material-ui';

type P = { text: string; onClick: Function };

export default class CustomButton extends React.Component<P> {
  render() {
    return (
      <Button
        onClick={() => this.props.onClick()}
        style={{
          width: '100%',
          height: '56px',
          borderRadius: '2px',
          backgroundImage: 'linear-gradient(81deg, #f77062, #fe5196)',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
          color: 'white'
        }}
      >
        {this.props.text}
      </Button>
    );
  }
}
