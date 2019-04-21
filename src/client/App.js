import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LogInScreen from "./pages/LogIn";
import MessagingScreen from "./pages/Messaging";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={LogInScreen} />
                <Route path="/chat/" component={MessagingScreen} />
            </Router>
        );
    }
}