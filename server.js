const express = require('express');
const appServer = express();
const expressLayouts = require('express-ejs-layouts');
const net = require('net');

const indexRouter = require('./routes/index');
const configuration = require('./routes/configuration')

appServer.use(express.urlencoded());
appServer.use(express.json())
appServer.set('view engine', 'ejs');
appServer.set('views', __dirname + '/views');
appServer.set('layout', 'layouts/layout');
appServer.use(expressLayouts);
appServer.use(express.static('public'));
appServer.use('/', indexRouter);
appServer.use('/configuration', configuration)

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

simServer.listen(9999, () => {
    console.log("Simulator server listening on port 9999");
});
appServer.listen(3000, () => {
    console.log("Client app started at port 3000...");
});

// appServer.get('/', (req, res) => {
//     res.send("Welcome to ModbusBuddy");
// });