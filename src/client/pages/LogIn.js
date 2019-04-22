import React from "react";
import "../App.css";
import "./LogIn.css";
import { Link } from "react-router-dom";

export default class LogInScreen extends React.Component {
    render() {
        return (
            <div className="login-container">
                <p className="title">Totally Accurate Chat Server</p>
                <p className="description">A chat server that's just trying its best</p>

                <div className="login-button">
                    <i className="fab fa-google fa-2x login-icon"></i>
                    <a className="login-text bg-a" href="/google">
                        Log In With Google
                    </a>
                </div>
            </div>
        );
    }
}