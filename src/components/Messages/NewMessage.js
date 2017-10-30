import React from 'react';
import { Input } from 'react-materialize';
import './Messages.css';

class NewMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { newMessage: '' };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.messages.push({content: this.state.newMessage, username: this.props.user.displayName, sentAt: new Date().getTime()});
        this.setState({ newMessage: '' });
    }

    handleNameChange(e) {
        e.preventDefault();
        this.setState({ newMessage: e.target.value });
    }

    renderMessageForm(){
        return (
            <form className='footer' onSubmit={ (e) => this.handleSubmit(e) }>
                <Input label="Message" value={ this.state.newMessage } onChange={ (e) => this.handleNameChange(e) } s={12} />
                <input type="submit" />
            </form>
        )
    }

    render() {
        return this.props.user ? this.renderMessageForm() : <div className='footer'>You must log in to post a message</div>;
    }
}

export default NewMessage;
