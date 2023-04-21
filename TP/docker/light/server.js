"use strict";

const express = require('express');
const app = express();
app.use(express.static('public'));
const http = require('http');
const webServer = http.Server(app);
const socketIo = require('socket.io');
const io = socketIo(webServer);

// globaler Zustand der Lampe
let light = false;

io.on('connection', socket => {
    socket.on('getLight', () => {
        socket.emit('setLight', light);
    });
    socket.on('toggleLight', () => {
        light = !light;
        io.emit('setLight', light);
    });
});

const server = webServer.listen(9000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('Users app listening at http://%s:%s', host, port)
})
