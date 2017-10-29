import React, { Component } from 'react';
import { Col, Row } from 'react-materialize';
import * as firebase from 'firebase';
import Rooms from './components/Rooms/Rooms';
import Messages from './components/Messages/Messages';
import NewRoom from './components/Rooms/NewRoom';
import logo from './logo.svg';
import './App.css';

var config = {
    apiKey: "AIzaSyA-RiVD74WwqS7-r8rrqssoPfn3c_7Q4cE",
    authDomain: "blocchat-d36c4.firebaseapp.com",
    databaseURL: "https://blocchat-d36c4.firebaseio.com",
    projectId: "blocchat-d36c4",
    storageBucket: "blocchat-d36c4.appspot.com",
    messagingSenderId: "478709015564"
  };
  
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="logo.png" />
          <h1 className="App-title">Bloc Chat -- BLOC IT OUT!</h1>
        </header>
        <div>
          <Row className="App-row">
            <Col s={2} className='Nav-bar'>
              <NewRoom firebase={firebase} />
              <Rooms firebase={firebase} />
            </Col>
            <Col s={10}>
              <Messages firebase={firebase} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
