import React from "react";
import "../App.css";
import "./Messaging.css";
import io from 'socket.io-client';

const socket = io('http://localhost:5000/');

export default class MessagingScreen extends React.Component {
    render() {
        return (
            <div className="messaging-container">
                <ChatRoomsMenu />
                <Messager />
            </div>
        );
    }
}

class ChatRoomsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRoom: 0
        }

    }

    selectRoom(room) {
        this.setState({
            selectedRoom: room
        });
    }

    render() {
        return (
            <div className="sidebar bg-a">
                <ChatRoom roomNumber={0} active={this.state.selectedRoom === 0} selectRoom={this.selectRoom.bind(this)} />
                <ChatRoom roomNumber={1} active={this.state.selectedRoom === 1} selectRoom={this.selectRoom.bind(this)} />
                <ChatRoom roomNumber={2} active={this.state.selectedRoom === 2} selectRoom={this.selectRoom.bind(this)} />
                <ChatRoom roomNumber={3} active={this.state.selectedRoom === 3} selectRoom={this.selectRoom.bind(this)} />
                <ChatRoom roomNumber={4} active={this.state.selectedRoom === 4} selectRoom={this.selectRoom.bind(this)} />
                <ChatRoom roomNumber={5} active={this.state.selectedRoom === 5} selectRoom={this.selectRoom.bind(this)} />
            </div>
        );
    }
}

class ChatRoom extends React.Component {
    render() {
        return (
            <div className={this.props.active ? "room bg-3" : "room"} onClick={() => this.props.selectRoom(this.props.roomNumber)}>
                <span className="room-name">Chat Room</span>
            </div>
        );
    }
}

class Messager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        socket.on("message", (message) => this.onMessageReceived(message));
    }

    onMessageReceived(message) {
        let newMessages = this.state.messages;
        newMessages.push(message);

        this.setState({
            messages: newMessages
        });
    }

    render() {
        return (
            <div className="messager">
                <Messages messages={this.state.messages} />
                <MessageSender />
            </div>
        );
    }
}

class Messages extends React.Component {
    render() {
        let messages = [];
        for (let i = 0; i < this.props.messages.length; i++) {
            if (socket.id === this.props.messages[i].id) {
                messages.push(<Message key={i} message={this.props.messages[i].message} sent />);
            } else {
                messages.push(<Message key={i} message={this.props.messages[i].message} />);
            }
        }

        return (
            <div className="messages">
                {messages}
            </div>
        );
    }
}

class Message extends React.Component {
    render() {
        if (this.props.sent) {
            return (
                <div className="message-sent-container slide-in-right">
                    <img className="message-pic-sent" src="https://lh3.googleusercontent.com/-uqmef23Wnp4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfJW2ZCXpDsmqVGczmjvxslDWWgWQ/s192-c-mo/photo.jpg" />
                    <div className="message-sent bg-a">
                        {this.props.message}
                    </div>
                </div>
            );

        } else {
            return (
                <div className="message-received-container slide-in-left">
                    <img className="message-pic-received" src="https://lh3.googleusercontent.com/-uqmef23Wnp4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfJW2ZCXpDsmqVGczmjvxslDWWgWQ/s192-c-mo/photo.jpg" />
                    <div className="message-received bg-2">
                        {this.props.message}
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

    checkForEnter(key) {
        if (key.key === "Enter") this.sendMessage();
    }

    sendMessage() {
        if (this.state.message === "") return;
        socket.emit('message', this.state.message);
        this.setState({
            message: "",
        });
    }


    render() {
        return (
            <div className="message-sender bg-2">
                <input className="messager-input bg-2" placeholder="Say something here..." value={this.state.message} onChange={this.messageChange.bind(this)} onKeyDown={this.checkForEnter.bind(this)} />
                <button className="btn btn-link" type="button" onClick={this.sendMessage.bind(this)}>
                    <i className="fas fa-paper-plane fa-2x color-a"></i>
                </button>
            </div>
        );
    }
}