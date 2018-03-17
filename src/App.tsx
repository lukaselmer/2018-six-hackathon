import * as React from 'react';
import './App.css';
import { database } from 'firebase';
import { Item } from './interfaces/db';

const logo = require('./logo.svg');

type P = { items: Item[] };

class App extends React.Component<{}, P> {
  constructor(props: {}) {
    super(props);
    this.state = { items: [] };
    database()
      .ref('/menu/items')
      .on('value', snapshot => {
        if (!snapshot) return;
        const items: Item[] = snapshot.val();
        this.setState({ items });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ul>{this.listItems()}</ul>
      </div>
    );
  }

  private listItems() {
    return this.state.items.map(item => <li key={item.id}>{item.id}</li>);
  }
}

export default App;
