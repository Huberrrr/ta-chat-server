import React from "react";
import "../App.css";
import "./Messaging.css";
import io from 'socket.io-client';

// const socket = io('http://ta-chat-server.herokuapp.com/');
const socket = io("http://localhost:5000");
fetch('/session')
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        socket.emit('login', json);
    });

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
            users: []
        }
    }

    componentDidMount() {
        socket.on("users", (users) => this.updateUsers(users));
    }

    updateUsers(users) {
        setTimeout(() => {
            this.setState({
                users: users
            });
        }, 100);
    }

    render() {
        let users = [];
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === socket.id) {
                users.push(<User user={this.state.users[i]} self />);
            } else {
                users.push(<User user={this.state.users[i]} />);
            }
        }

        return (
            <div className="sidebar bg-a">
                {users}
            </div>
        );
    }
}

class User extends React.Component {
    render() {
        return (
            <div className={this.props.self ? "user bg-3" : "user"}>
                <img className="user-pic" src={this.props.user.pic} />
                <span className="user-name">{this.props.user.name}</span>
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
            checked: true,
            message: "",
            pic: props.pic
        };
    }

    checkboxChange(event) {
        this.setState({
            checked: event.target.checked
        });
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
            pic: this.state.pic,
            willTranslate: this.state.checked
        }
        socket.emit('message', toSend);

        this.setState({
            message: "",
        });
    }


    render() {
        return (
            <div className="message-sender bg-2">
                <div className="toggler">
                    Translate?
                    <label className="switch">
                        <input type="checkbox" checked={this.state.checked} onChange={this.checkboxChange.bind(this)}></input>
                        <span className="slider round"></span>
                    </label>
                </div>
                <input className="messager-input bg-2" placeholder="Say something here..." value={this.state.message} onChange={this.messageChange.bind(this)} onKeyDown={this.checkForEnter.bind(this)} />
                <button className="btn btn-link" type="button" onClick={this.sendMessage.bind(this)}>
                    <i className="fas fa-paper-plane fa-2x color-a"></i>
                </button>
            </div>
        );
    }
}