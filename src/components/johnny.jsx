import React, { Component } from "react";
import {
    connect,
    getDate,
    userCount,
    fireLed,
    getTime,
    userName
} from "../api";

import Voltage from './voltage';

class Johnny extends Component {
    constructor(props) {
        super(props);
        this.state = {
            led: false,
            date: "",
            time: null,
            userCount: 0,
            userName: ""
        }
        // something about callbacks being generated on each render! with arrow syntax
        // this.fireLed = this.fireLed.bind(this);
    }

    componentDidMount() {
        connect(result => {
            this.setState({
                date: result
            });
        });
        getDate(today => {
            this.setState({
                date: today
            });
        });
        userCount(users => {
            this.setState({
                userCount: users
            });
        });
        userName(user => {
            this.setState({
                userName: user
            });
        });
        fireLed(result => {
            this.setState({
                led: result
            });
        });
    }

    componentWillUnmount() {

    }

    render() {

        const { userCount, date, userName, led } = this.state

        return (
            <>
                <h1>{date || '04/20/2019'}</h1>
                <h2>{userName || 'Hunter H'}</h2>
                <h2>{userCount < 1 ?
                    `${userCount} No users connected` :
                    `${userCount} user(s) are connected!`}</h2>
                <h3>{led ? `LED is on` : `LED is off`}</h3>
                <Voltage />
            </>
        )
    }
}

export default Johnny;