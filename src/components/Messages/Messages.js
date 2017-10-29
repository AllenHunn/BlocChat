import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import './Messages.css';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    renderCollectionItem(msg, rowID) {
        if(rowID%2 === 0) {
            return (<CollectionItem key={msg.key} style={{backgroundColor: 'grey'}}>{this.renderMessageText(msg)}</CollectionItem>);
        }
        return (<CollectionItem key={msg.key} style={{backgroundColor: 'lightgrey'}}>{this.renderMessageText(msg)}</CollectionItem>);
    }

    renderMessageText(msg){
        return(
            <span>
                <h5 className='username'>{msg.username}</h5>
                <div className='message-date'>{msg.sentAt}</div>
                <div className='message-content'>{msg.content}</div>
            </span>
        )
    }

    render() {
        return (
            <Collection>
                {
                    this.state.messages.map((msg, index) =>
                        this.renderCollectionItem(msg, index)
                    )
                }
            </Collection>
        );
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot  => {
            const message = Object.assign(snapshot.val(), {key: snapshot.key});
            console.log(message);
            this.setState({ messages: this.state.messages.concat( message ) });
        });
    }
}

export default Messages;
