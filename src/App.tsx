import * as React from 'react';
import './App.css';
import SubscribedGoals from './goals/SubscribedGoals';
import Goals from './goals/Goals';
import Goal from './goals/Goal';
import { Route, Switch, Link } from 'react-router-dom';
import { database } from 'firebase';
import { DBStructure } from './interfaces/db';
import { Toolbar, AppBar, IconButton, Typography } from 'material-ui';
import { AccountCircle, Menu as MenuIcon } from 'material-ui-icons';
const logo = require('./logo.svg');
const dbContents = require('./firebaseDataNew.json').app;

type S = { db: DBStructure; showMenu?: boolean };

export default class App extends React.Component<{}, S> {
  firebaseRef: database.Reference;
  firebaseCallback: (a: firebase.database.DataSnapshot | null, b?: string) => string;

  componentDidMount() {
    this.firebaseRef = database().ref('/app');
    this.firebaseCallback = this.firebaseRef.on('value', snapshot => {
      if (!snapshot) return;
      const db: DBStructure = snapshot.val();
      this.setState({ db });
    });
    this.setState({ db: dbContents as any });
  }

  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  render() {
    if (!this.state || !this.state.db) return 'Loading data, please wait...';

    return (
      <div>
        <AppBar style={{ backgroundColor: '#e91e63' }} position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
              <MenuIcon />
            </IconButton>
            <Typography style={{ flexGrow: 1 }} variant="title" color="inherit">
              <img style={{ marginLeft: '20px' }} src={logo} />
            </Typography>
            <div>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              {/* <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={() => console.log('this.handleMenu')}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
              {/* <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu> */}
            </div>
          </Toolbar>
        </AppBar>
        {this.state.showMenu && (
          <header onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
            <div
              style={{
                position: 'absolute',
                marginLeft: '25px'
              }}
            >
              <div
                style={{
                  border: '1px #ccc solid',
                  borderBottom: 'none',
                  background: 'white'
                }}
              >
                <Link
                  style={{
                    padding: '12px 15px',
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none'
                  }}
                  to={`/`}
                >
                  Dreams
                </Link>
              </div>
              <div
                style={{
                  border: '1px #ccc solid',
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                  background: 'white'
                }}
              >
                <Link
                  style={{
                    display: 'block',
                    color: 'inherit',
                    textDecoration: 'none',
                    padding: '12px 15px'
                  }}
                  to={`/my-goals`}
                >
                  My Dreams
                </Link>
              </div>
            </div>
          </header>
        )}
        <Switch>
          <Route exact={true} path="/" render={() => <Goals goals={this.state.db.goals} />} />
          <Route path="/goals/:id" render={props => this.renderGoal(props.match.params.id)} />
          <Route path="/my-goals" render={() => this.renderSubscribedGoals()} />
        </Switch>
      </div>
    );
  }

  private renderGoal(goalId: string) {
    return <Goal id={goalId} db={this.state.db as DBStructure} />;
  }

  private renderSubscribedGoals() {
    return <SubscribedGoals db={this.state.db as DBStructure} />;
  }
}
