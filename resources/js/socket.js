const app = require('express')();

if (process.argv.indexOf('--production') > -1) {
    const fs = require('fs');
    const sslOptions = {
        key: fs.readFileSync('/etc/letsencrypt/live/snapturebox.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/snapturebox.com/cert.pem'),
    };
    var server = require('https').Server(sslOptions, app);
} else if (process.argv.indexOf('--dev') > -1) {
    const fs = require('fs');
    const sslOptions = {
        key: fs.readFileSync('/Users/cleidoscope/.config/valet/Certificates/snapturebox.app.key'),
        cert: fs.readFileSync('/Users/cleidoscope/.config/valet/Certificates/snapturebox.app.crt'),
    };
    var server = require('https').Server(sslOptions, app);
} else {
    var server = require('http').createServer(app);
}

server.listen(8443, function() {
    console.log('Listening on 8443');
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
});

io.on('connection', function(socket) {
    let socketData = null;
    socket.on('message_sent', function(data) {
        socket.broadcast.emit('new_message', data);
    });
    socket.on('live_call_offer', function(data) {
        socketData = data;
        socket.broadcast.emit('live_call_offer', data);
    });
    socket.on('live_call_answer', function(data) {
        socketData = data;
        socket.broadcast.emit('live_call_answer', data);
    });
    socket.on('live_call_reject', function(data) {
        socket.broadcast.emit('live_call_reject', data);
    });
    socket.on('live_call_end', function(data) {
        socket.broadcast.emit('live_call_end', data);
    });
    socket.on('live_call_candidate', function(data) {
        socket.broadcast.emit('live_call_candidate', data);
    });




    socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') socket.connect(); // try to reconnect
        else if(reason === 'transport close' && socketData) { // page refreshed or closed
            socket.broadcast.emit('live_call_end', socketData);
            socketData = null;
        }
    });
    
});
