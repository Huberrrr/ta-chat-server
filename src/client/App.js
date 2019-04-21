import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Messaging from "./pages/Messaging";

import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000/")

class App extends React.Component {
    render() {
        return (
            <Messaging />
        );
    }
}

export default hot(module)(App);