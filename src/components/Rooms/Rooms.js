import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rooms: [] };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.changeRoom = this.changeRoom.bind(this);
    }

    changeRoom(e){
        e.preventDefault();
        this.props.changeRoomEvent(this.state.rooms[e.target.id]);
    }

    renderCollectionItem(room, rowID) {
        return (<CollectionItem key={room.key} id={rowID} active={this.getIsActive(room)} onClick={this.changeRoom} style={{ backgroundColor: this.getBackgroundColor(rowID) }}>{room.name}</CollectionItem>);
    }

    getIsActive(room){
        return this.props.activeRoom && room.key === this.props.activeRoom.key;
    }

    getBackgroundColor(rowID){
        return (rowID%2 === 0) ? 'darkgoldenrod' : 'burlywood';
    }

    render() {
        return( 
            <Collection>
            {
                this.state.rooms.map((room, index) =>
                    this.renderCollectionItem(room, index)
                )
            }
            </Collection>
        );
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot  => {
            const room = Object.assign(snapshot.val(), {key: snapshot.key});
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }
}

export default Rooms;