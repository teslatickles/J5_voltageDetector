const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 5000;



const five = require("johnny-five");
const board = new five.Board();

let os = require('os');

process.EventEmitter = require('events').EventEmitter; // add this line
const zetta = require('zetta');
zetta()
    .name('Hunter-H')
    // .link('https://agile-fortress-24120.herokuapp.com/')
    .expose('*')
    .listen(PORT, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('running on http://localhost:', PORT)
    });
board.on("ready", () => {

    const sw = new five.Switch(3);
    const led = new five.Led(13);

    const voltage = new five.Sensor({
        pin: "A0",
        freq: "500",
        // threshold deals with recognized change in ADC value -- play around with this for accuracy
        threshold: 5
    });

    // var refV =  5;
    const ref = 5;
    let users = 0;
    let maxV = 1.5;

    io.on("connection", async socket => {
        const today = new Date().toDateString();
        // var time = new Date().getTime();
        // io.emit("getTime", this.timeResult);
        io.emit("getDate", today);
        console.log(today);

        const userName = os.userInfo().username;
        io.emit("userName", userName);
        console.log(userName);

        users = users + 1;
        io.emit("userCount", users)
        console.log(users);

        sw.on("close", () => {
            io.emit("fire", true);
            led.on();
        })
        sw.on("open", () => {
            io.emit("fire", false);
            led.off();
        })

        // io.on("refV", refV);

        voltage.on("change", () => {

            let volts = (voltage.fscaleTo(0, 1) * ref).toFixed(2);

            if (volts > maxV) {
                volts = 0;
            }
            io.emit("voltageReading", volts);

            if (volts > '1.2') {
                io.emit("fire", true);
                led.on();
            } else {
                io.emit("fire", false);
                led.off();
            }
            console.log(volts);
        })
    });

    // server.listen(process.env.PORT || port, () => {
    //     console.log(`server up @ ${port}`)
    // })
    // });
});
