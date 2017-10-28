import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rooms: [] };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    render() {
        return( 
            <Collection>
            {
                this.state.rooms.map((room) =>
                    <CollectionItem href={room.key}>{room.name}</CollectionItem>
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