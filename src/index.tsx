import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDd7LzhPE4iCunAmldCA7wrKu5MoruRslw',
  authDomain: 'six-hackathon.firebaseapp.com',
  databaseURL: 'https://six-hackathon.firebaseio.com',
  projectId: 'six-hackathon',
  storageBucket: 'six-hackathon.appspot.com',
  messagingSenderId: '1058451606912'
};
firebase.initializeApp(config);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
