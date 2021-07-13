const express = require('express');
const router = express.Router();
const net = require('net');

const simServer = net.createServer(conn => {
    console.log('New client connected.');

    conn.on('data', (data) => {
        console.log('Incoming data...');
        console.log('Incoming data: ' + JSON.stringify(data));
        // sample response for slave device error response bytesToSend[7] set to 0x80
        // sample response for slave device busy simulation response bytesToSend[8] set to 6 or 0x36
        var bytesToSend = [0x50, 0x4f, 0x50, 0x4f, 0x4f, 0x50, 0x4f, 0x80, 0x06, 0x4f, 0x4f, 0x50, 0x4f, 0x4f, 0x50, 0x4f];
        var hexVal = new Uint8Array(bytesToSend);

        conn.write(hexVal);
    });

    conn.on('end', () => {
        console.log('client left');
    });
});

router.post('/', (req, res) => {

    if (!simServer.listening) {
        console.log("sim is off, so we will turn it on");
        startServer();
        isListening = true;
    } else {
        console.log("sim is ON, so we will turn it OFF");
        stopServer();
        isListening = false;
    }
})

function startServer() {
    console.log("starting server");
    simServer.listen(9999, () => {
        console.log("Simulator server listening on port 502");
    });
}

function stopServer() {
    console.log("stopping server");
    simServer.close();
}


module.exports = router;