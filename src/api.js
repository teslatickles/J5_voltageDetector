import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:5000/");

function connect(callback) {
    socket.on("connection", () => {
        callback();
    });
}

function grabRef(callback) {
    socket.on("refV", refV => {
        callback(refV);
    })
}

function getDate(callback) {
    socket.on("getDate", today => {
        callback(today);
    });
}

function getTime(callback) {
    socket.on("getTime", time => {
        callback(time);
    });
}

function userName(callback) {
    socket.on("userName", name => {
        callback(name);
    });
}

function userCount(callback) {
    socket.on("userCount", users => {
        callback(users);
    });
}

function fireLed(callback) {
    socket.on("fire", result => {
        callback(result);
    });
}

function grabVoltage(callback) {
    socket.on("voltageReading", result => {
        callback(result);
    })
}

export { connect, grabRef, getDate, getTime, userCount, userName, fireLed, grabVoltage };