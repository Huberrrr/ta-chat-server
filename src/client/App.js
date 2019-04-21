import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Messaging from "./pages/Messaging";

class App extends React.Component {
    render() {
        return (
            <Messaging />
        );
    }
}

export default hot(module)(App);