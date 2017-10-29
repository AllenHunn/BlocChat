import React from 'react';
import { Input } from 'react-materialize';

class NewRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { newRoomName: '' };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    handleSubmit(e) {
        e.preventDefault();
        this.roomsRef.push({name: this.state.newRoomName});
        this.setState({ newRoomName: '' });
    }

    handleNameChange(e) {
        e.preventDefault();
        this.setState({ newRoomName: e.target.value });
    }

    render() {
        return (
            <form onSubmit={ (e) => this.handleSubmit(e) }>
                <Input label="New Room" placeholder="Room Name" value={ this.state.newRoomName } onChange={ (e) => this.handleNameChange(e) } />
                <input type="submit" />
            </form>
        )
    }
}

export default NewRoom;
