import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <ChatRoomsMenu />
                <Messager />
            </div>
        );
    }
}

class ChatRoomsMenu extends React.Component {
    render() {
        return (
            <div className="sidebar bg-a">
                <ChatRoom active={false} />
                <ChatRoom active={true} />
                <ChatRoom active={false} />
                <ChatRoom active={false} />
                <ChatRoom active={false} />
                <ChatRoom active={false} />
            </div>
        );
    }
}

class ChatRoom extends React.Component {
    render() {
        return (
            <div className={this.props.active ? "room bg-3" : "room"}>
                <span className="room-name">Chat Room</span>
            </div>
        );
    }
}

class Messager extends React.Component {
    render() {
        return (
            <div className="messager">
                <Messages />
                <MessageSender />
            </div>
        );
    }
}

class Messages extends React.Component {
    render() {
        return (
            <div className="messages">
                <Message />
                <Message />
                <Message sent />
                <Message />
            </div>
        );
    }
}

class Message extends React.Component {
    render() {
        if (this.props.sent) {
            return (
                <div className="message-sent-container">
                    <img className="message-pic-sent" src="https://lh3.googleusercontent.com/-uqmef23Wnp4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfJW2ZCXpDsmqVGczmjvxslDWWgWQ/s192-c-mo/photo.jpg" />
                    <div className="message-sent bg-a">
                        This is a message that was sent
                    </div>
                </div>
            );

        } else {
            return (
                <div className="message-received-container">
                    <img className="message-pic-received" src="https://lh3.googleusercontent.com/-uqmef23Wnp4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfJW2ZCXpDsmqVGczmjvxslDWWgWQ/s192-c-mo/photo.jpg" />
                    <div className="message-received bg-2">
                        This is a message that was received
                    </div>
                </div>
            );
        }
    }
}

class MessageSender extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };
    }

    messageChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    sendMessage() {
        alert("Sending: " + this.state.message);
    }

    render() {
        return (
            <div className="message-sender bg-2">
                <input className="messager-input bg-2" placeholder="Say something here..." value={this.state.message} onChange={this.messageChange.bind(this)} />
                <button className="btn btn-link" type="button" onClick={this.sendMessage.bind(this)}>
                    <i className="fas fa-paper-plane fa-2x color-a"></i>
                </button>
            </div>
        );
    }
}

export default hot(module)(App);