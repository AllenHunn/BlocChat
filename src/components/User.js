import React from 'react';
import { Button } from 'react-materialize';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSignIn(e){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  handleSignOut(e){
    this.props.firebase.auth().signOut();
  }

  renderSignInButton(){
    return(
        <div>
            <Button waves='light' onClick={ (e) => this.handleSignIn(e) }>Sign In</Button>
        </div>
    );
  }

  renderSignOutButton(){
    return(
        <div>
            <h5>{this.props.user.displayName}</h5>
            <Button waves='light' onClick={ (e) => this.handleSignOut(e) }>Sign Out</Button>
        </div>
    );
  }

  renderButton(){
      if (this.props.user){
          return this.renderSignOutButton();
      }

      return this.renderSignInButton();
  }

  render() {
    return(
        this.renderButton()
    );
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
    });
  }
}

export default User;
