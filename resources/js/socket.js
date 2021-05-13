const app = require("express")();

if (process.argv.indexOf("--production") > -1) {
    console.log("Running on production..");
    const fs = require("fs");
    const sslOptions = {
        key: fs.readFileSync("/etc/letsencrypt/live/telloe.com/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/telloe.com/cert.pem")
    };
    var server = require("https").Server(sslOptions, app);
} else if (process.argv.indexOf("--dev") > -1) {
    const fs = require("fs");
    const sslOptions = {
        key: fs.readFileSync(
            "/Users/cleidoscope/.config/valet/Certificates/telloe.test.key"
        ),
        cert: fs.readFileSync(
            "/Users/cleidoscope/.config/valet/Certificates/telloe.test.crt"
        )
    };
    var server = require("https").Server(sslOptions, app);
} else {
    var server = require("http").createServer(app);
}

server.listen(8443, function() {
    console.log("Listening on 8443");
});

const io = require("socket.io")(server, {
    pingTimeout: 60000
});

let online_users = {};
let call_users = {};
io.on("connection", function(socket) {
    socket.on("new_notification", function(data) {
        socket.broadcast.emit("new_notification", data);
    });

    socket.on("new_conversation", function(data) {
        socket.broadcast.emit("new_conversation", data);
    });

    socket.on("message_sent", function(data) {
        socket.broadcast.emit("new_message", data);
    });

    socket.on("last_message_read", function(data) {
        socket.broadcast.emit("last_message_read", data);
    });

    socket.on("is_typing", function(data) {
        socket.broadcast.emit("is_typing", data);
    });

    socket.on("invite_token", function(data) {
        socket.broadcast.emit("invite_token", data);
    });

    socket.on("member_invite_token", function(data) {
        socket.broadcast.emit("member_invite_token", data);
    });

    socket.on("user_online", function(user_id) {
        let user_ids = Object.values(online_users);
        if (!user_ids[user_id]) {
            online_users[socket.id] = user_id;
            user_ids.push(user_id);
        }

        io.emit("online_users", user_ids);
    });

    // Video call
    let userData = null;

    socket.on("live_call_ready", function(data) {
        userData = data;
        let is_limit = false;
        if (!call_users[data.conversation_id])
            call_users[data.conversation_id] = [];
        let existsIndex = call_users[data.conversation_id].findIndex(
            x => x == data.user_id
        );
        if (existsIndex == -1) {
            if (call_users[data.conversation_id].length < 8) {
                call_users[data.conversation_id].push(data.user_id);
            } else {
                is_limit = true;
            }
        }
        setTimeout(() => {
            socket.emit("live_call_connections", {
                socket_id: socket.id,
                data: call_users,
                is_limit: is_limit
            });
        }, 50);
    });

    socket.on("live_call_connection_request", function(data) {
        socket.broadcast.emit("live_call_connection_request", data);
    });
    socket.on("live_call_offer", function(data) {
        socket.broadcast.emit("live_call_offer", data);
    });
    socket.on("live_call_answer", function(data) {
        socket.broadcast.emit("live_call_answer", data);
    });
    socket.on("live_call_candidate", function(data) {
        socket.broadcast.emit("live_call_candidate", data);
    });

    socket.on("live_call_presenter", function(data) {
        socket.broadcast.emit("live_call_presenter", data);
    });

    socket.on("live_call_incoming", function(data) {
        socket.broadcast.emit("live_call_incoming", data);
    });
    socket.on("live_call_reject", function(data) {
        socket.broadcast.emit("live_call_reject", data);
    });
    socket.on("live_call_end", function(data) {
        if (userData) {
            let userIndex = call_users[userData.conversation_id].findIndex(
                x => x == userData.user_id
            );
            if (userIndex > -1) {
                call_users[userData.conversation_id].splice(userIndex, 1);
            }
            if (call_users[userData.conversation_id].length == 1)
                call_users[userData.conversation_id] = [];
            if (data.broadcast)
                socket.broadcast.emit("live_call_end", userData);
            userData = null;
        }
    });

    socket.on("disconnect", reason => {
        if (reason === "io server disconnect") socket.connect();
        // try to reconnect
        else if (reason === "transport close" && userData) {
            // page refreshed or closed
            let userIndex = call_users[userData.conversation_id].findIndex(
                x => x == userData.user_id
            );
            if (userIndex > -1) {
                call_users[userData.conversation_id].splice(userIndex, 1);
            }
            socket.broadcast.emit("live_call_end", userData);
            //socket.broadcast.emit('live_call_end', userData);
            userData = null;
        }

        delete online_users[socket.id];
        let user_ids = Object.values(online_users);
        io.emit("online_users", user_ids);
    });
});
