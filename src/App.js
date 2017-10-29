import React, { Component } from 'react';
import { Col, Row } from 'react-materialize';
import * as firebase from 'firebase';
import Rooms from './components/Rooms/Rooms';
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
          <h1 className="App-title">Bloc-Chat -- BLOC IT OUT!</h1>
        </header>
        <div>
          <Row>
            <Col s='3' className='Nav-bar'>
              <Rooms firebase={firebase}/>
            </Col>
            <Col s='9'>
              Placeholder
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
