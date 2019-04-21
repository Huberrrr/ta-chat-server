import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LogInScreen from "./pages/LogIn";
import MessagingScreen from "./pages/Messaging";

import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000/")

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={LogInScreen} />
                <Route path="/chat/" component={MessagingScreen} />
            </Router>
        );
    }
}

export default hot(module)(App);