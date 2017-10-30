import React, { Component } from 'react';
import { Col, Row } from 'react-materialize';
import * as firebase from 'firebase';
import Rooms from './components/Rooms/Rooms';
import Messages from './components/Messages/Messages';
import NewRoom from './components/Rooms/NewRoom';
import User from './components/User';
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
  constructor(){
      super();
      this.state = { activeRoom: null, currentUser: null };
      this.setBindings();
  }

  setBindings(){
    this.changeRoom = this.changeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  changeRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user){
    this.setState({ currentUser: user });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="logo.png" />
          <h1 className="App-title">Bloc Chat -- BLOC IT OUT!</h1>
          <div class="User-button">
            <User firebase={firebase} setUser={this.setUser} user={this.state.currentUser} />
          </div>
        </header>
        <div>
          <Row className="App-row">
            <Col s={2} l={1} className='Nav-bar'>
              <NewRoom  firebase={firebase} />
              <Rooms firebase={firebase} changeRoomEvent={this.changeRoom} activeRoom={this.state.activeRoom} />
            </Col>
            <Col s={10} l={11}>
              <div className='Room-name'>
                  <h3>{this.state.activeRoom && 'Room: ' + this.state.activeRoom.name}</h3>
              </div>
              <div className="Messages">
                <Messages firebase={firebase} room={this.state.activeRoom} user={this.state.currentUser} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
