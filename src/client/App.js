import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1> MERN Boilerplate </h1>
            </div>
        );
    }
}

export default hot(module)(App);