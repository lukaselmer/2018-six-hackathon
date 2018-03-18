import * as React from 'react';
import { Coupon, Coupons } from '../interfaces/db';
import Button from './Button';
import { List, ListItem, Card } from 'material-ui';

type P = { coupons: Coupons };

export default class CouponsComponent extends React.Component<P> {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Card>
          <List component="nav">{Object.keys(this.props.coupons).map(k => this.renderCoupon(this.props.coupons[k]))}</List>
        </Card>
      </div>
    );
  }

  private renderCoupon(coupon: Coupon) {
    const isLast = this.props.coupons[Object.keys(this.props.coupons).reverse()[0]] === coupon;
    return (
      <ListItem divider={!isLast} key={coupon.text}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>{coupon.text}</div>
          <div style={{ width: '200px' }}>
            <Button text={coupon.label} onClick={() => (window as any).open(coupon.link, '_blank').focus()} />
          </div>
        </div>
      </ListItem>
    );
  }
}
