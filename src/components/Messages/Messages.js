import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import moment from 'moment';
import './Messages.css';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };      
    }

    renderCollectionItem(msg, rowID) {
        return (<CollectionItem key={msg.key} style={{backgroundColor: this.getBackgroundColor(rowID)}}>{this.renderMessageText(msg)}</CollectionItem>);
    }

    getBackgroundColor(rowID){
        return (rowID%2 !== 0) ? 'grey' : 'lightgrey';
    }

    renderMessageText(msg){
        return(
            <span>
                <h5 className='username'>{msg.username}</h5>
                <div className='message-date'>{moment(msg.sentAt).format('MM/DD/YYYY h:mm:ss a')}</div>
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

    }

    componentWillReceiveProps(nextProps){
        if (this.props.room){
            if (this.props.room.key === nextProps.room.key){
                return;
            }
            else
            {
                this.messagesRef.off('child_added');                
            }
        }
        this.setState({messages: []});
        this.messagesRef = this.props.firebase.database().ref('messages/' + nextProps.room.key).orderByChild('sentAt');
        this.messagesRef.on('child_added', snapshot  => {
            const message = Object.assign(snapshot.val(), {key: snapshot.key});
            this.setState({ messages: this.state.messages.concat( message ) });
        });
    }
}

export default Messages;
