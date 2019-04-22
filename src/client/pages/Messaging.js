import React from "react";
import "../App.css";
import "./Messaging.css";
import io from 'socket.io-client';

const socket = io('http://ta-chat-server.herokuapp.com/');

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
            messages: [],
            session: {},
        }
    }

    componentDidMount() {
        socket.on("message", (message) => this.onMessageReceived(message));

        fetch('/session')
            .then((res) => {
                return res.json();
            })
            .then((json) => this.loadSession(json));
    }

    componentDidUpdate() {
        this.scrollDown();
    }

    loadSession(session) {
        setTimeout(() => {
            this.setState({
                session: session
            });
        }, 100);
    }

    onMessageReceived(message) {
        let newMessages = this.state.messages;
        newMessages.push(message);

        this.setState({
            messages: newMessages
        });
    }

    scrollDown() {
        let messagesDiv = document.getElementsByClassName("messages")[0];
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    render() {
        return (
            <div className="messager">
                <Messages messages={this.state.messages} />
                {
                    this.state.session.picture !== undefined &&
                    <MessageSender pic={this.state.session.picture} />
                }
            </div>
        );
    }
}

class Messages extends React.Component {
    render() {
        let messages = [];
        for (let i = 0; i < this.props.messages.length; i++) {
            if (socket.id === this.props.messages[i].id) {
                messages.push(<Message key={i} message={this.props.messages[i]} sent />);
            } else {
                messages.push(<Message key={i} message={this.props.messages[i]} />);
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
                    <img className="message-pic-sent" src={this.props.message.pic} />
                    <div className="message-sent bg-a">
                        {this.props.message.message}
                    </div>
                </div>
            );

        } else {
            return (
                <div className="message-received-container slide-in-left">
                    <img className="message-pic-received" src={this.props.message.pic} />
                    <div className="message-received bg-2">
                        {this.props.message.message}
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
            message: "",
            pic: props.pic
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

        let toSend = {
            message: this.state.message,
            pic: this.state.pic
        }
        socket.emit('message', toSend);

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