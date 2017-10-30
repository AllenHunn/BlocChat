import React from 'react';
import ReactDOM from 'react-dom';
import { Collection, CollectionItem } from 'react-materialize';
import moment from 'moment';
import NewMessage from './NewMessage';
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

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node && node.scrollIntoView({ behavior: "smooth" });
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
        if (!this.props.room)
            return ("");
        return (
            <div>
                    <Collection className='Messages'>
                        {
                            this.state.messages.map((msg, index) =>
                                this.renderCollectionItem(msg, index)
                            )
                        }
                        <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
                    </Collection>
                <NewMessage messages={this.state.messagesRef} user={this.props.user} />
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.room)
            return;

        if (this.props.room){
            if (this.props.room.key === nextProps.room.key){
                return;
            }
            else
            {
                this.state.messagesRef.off('child_added');                
            }
        }
        
        this.setState({messages: [], messagesRef: this.props.firebase.database().ref('messages/' + nextProps.room.key)}, function(){
            this.state.messagesRef.orderByChild('sentAt').on('child_added', snapshot  => {
                const message = Object.assign(snapshot.val(), {key: snapshot.key});
                this.setState({ messages: this.state.messages.concat( message ) });
            });
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
}

export default Messages;
