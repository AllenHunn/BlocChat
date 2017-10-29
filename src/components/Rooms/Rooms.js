import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rooms: [] };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    renderCollectionItem(room, rowID) {
        if(rowID%2 === 0) {
            return (<CollectionItem key={room.key} style={{backgroundColor: 'antiquewhite'}}>{room.name}</CollectionItem>);
        }
        return (<CollectionItem key={room.key} style={{backgroundColor: 'burlywood'}}>{room.name}</CollectionItem>);
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