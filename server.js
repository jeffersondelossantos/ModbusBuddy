const net = require('net');

const server = net.createServer(conn => {
    console.log('new client');

    conn.on('data', (data) => {
        console.log('in');
        console.log('Incoming data: ' + data.toString());
        console.log('Incoming data: ' + JSON.stringify(data));
        //conn.write(data + '\r\n');
        // sample response for slave device error response bytesToSend[7] set to 0x80
        // sample response for slave device busy simulation response bytesToSend[8] set to 6 or 0x36
        var bytesToSend = [0x50, 0x4f, 0x50, 0x4f, 0x4f, 0x50, 0x4f, 0x80, 0x06, 0x4f, 0x4f, 0x50, 0x4f, 0x4f, 0x50, 0x4f];
    hexVal = new Uint8Array(bytesToSend);
        conn.write(hexVal);
        // conn.write('1000000060000000000000000000');
    });

    conn.on('end', () => {
        console.log('client left');
    });
});

server.listen(502);

