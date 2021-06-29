const express = require("express");
const app = express();
const port = 502;
const http = require("http").createServer();

const io = require("socket.io")(http);

io.on("connection", (socket) => {
    socket.emit("welcome", "Welcome to ModbusBuddy!");
});

http.listen(port, () => {
    console.log("Server is listening to port ", port);
});