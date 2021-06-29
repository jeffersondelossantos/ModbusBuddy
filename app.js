const io = require("socket.io-client");

let socket = io.connect("http://localhost:502");

socket.on("welcome", (data) => {
    console.log("Received ", data);
});