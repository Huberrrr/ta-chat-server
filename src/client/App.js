import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <ChatRoomsMenu />
                <Messages />
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
                    <div className="message-received">
                        This is a message that was received
                    </div>
                </div>
            );
        }
    }
}

export default hot(module)(App);