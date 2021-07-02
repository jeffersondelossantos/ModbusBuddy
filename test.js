const net = require('net');

const options = {
    port: 502
};

const client = net.createConnection(options, () => {
    client.write('hello\r\n');
});

client.on('data', data => {
    console.log(data.toString());
    client.end();
})