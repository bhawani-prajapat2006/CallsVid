import { json } from "express";
import { Server } from "socket.io"

let connections = {};
let messages = {};
let timeOnline = {};

const connectToServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("join-call", (path) => {
            if(connections[path] === undefined){
                connections[path] = [];
            }

            connections[path].push(socket.id);

            timeOnline[socket.id] = new Date();

            for(let a = 0; a < connections[path].length; a++){
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
            }

            if(messages[path] !== undefined){
                for(let a = 0; a < messages[path].length; ++a){
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'] ,messages[path][a]['sender'], messages[path][a]['timestamp'], messages[path][a]['socket-id-sender'], true)
                }
            }
        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender, timestamp) => {

            const [matchingRoom, found] = Object.entries(connections).reduce(([room, isFound], [roomKey, roomValue]) => {

                if(!isFound && roomValue.includes(socket.id)){
                    return [roomKey, true];
                }

                return [room, isFound];
            }, ['', false]);

            if(found === true){
                if(messages[matchingRoom] === undefined){
                    messages[matchingRoom] = [];
                }

                messages[matchingRoom].push({ 'sender' : sender, 'data' : data, 'timestamp': timestamp, 'socket-id-sender' : socket.id });

                console.log("message", matchingRoom, ":", sender, data, timestamp);

                connections[matchingRoom].forEach(element => {
                    io.to(element).emit("chat-message", data, sender, timestamp, socket.id, false);
                });
            }
        })

        socket.on("disconnect", () => {
            var diffTime = Math.abs(timeOnline[socket.id] - new Date());

            var key;

            for(const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))){

                for(let a = 0; a < v.length; ++a){

                    if(v[a] === socket.id){
                        key = k;

                        for(let a = 0; a < connections[key].length; ++a){
                            io.to(connections[key][a]).emit('user-left', socket.id);
                        }

                        var index = connections[key].indexOf(socket.id);

                        connections[key].splice(index, 1);

                        if(connections[key].length === 0){
                            delete connections[key];
                        }
                    }
                }
            }
        })
    })

    return io;
}

export default connectToServer;



// import { Server } from "socket.io";

// let connections = {};
// let messages = {};
// let timeOnline = {};

// const connectToServer = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["*"],
//       credentials: true
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     socket.on("join-call", (path) => {
//       if (!connections[path]) {
//         connections[path] = [];
//       }

//       connections[path].push(socket.id);
//       timeOnline[socket.id] = new Date();

//       // Notify others of new user
//       for (let id of connections[path]) {
//         io.to(id).emit("user-joined", socket.id, connections[path]);
//       }

//       // Send chat history to the new user
//       if (messages[path]) {
//         for (let msg of messages[path]) {
//           io.to(socket.id).emit(
//             "chat-message",
//             msg.data,
//             msg.sender,
//             msg.timestamp,
//             msg["socket-id-sender"],
//             true // <- isHistory flag
//           );
//         }
//       }
//     });

//     socket.on("signal", (toId, message) => {
//       io.to(toId).emit("signal", socket.id, message);
//     });

//     // ⛔ Fix this line: `true` is not a valid variable name
//     socket.on("chat-message", (data, sender, timestamp) => {
//       const [matchingRoom, found] = Object.entries(connections).reduce(
//         ([room, isFound], [roomKey, roomValue]) => {
//           if (!isFound && roomValue.includes(socket.id)) {
//             return [roomKey, true];
//           }
//           return [room, isFound];
//         },
//         ["", false]
//       );

//       if (found) {
//         if (!messages[matchingRoom]) {
//           messages[matchingRoom] = [];
//         }

//         const messageObject = {
//           sender,
//           data,
//           timestamp,
//           "socket-id-sender": socket.id
//         };

//         messages[matchingRoom].push(messageObject);

//         // Broadcast to all users in the room (not marked as history)
//         for (let id of connections[matchingRoom]) {
//           io.to(id).emit("chat-message", data, sender, timestamp, socket.id, false);
//         }
//       }
//     });

//     socket.on("disconnect", () => {
//       const disconnectTime = new Date();
//       const connectTime = timeOnline[socket.id];
//       const diffTime = Math.abs(disconnectTime - connectTime);

//       for (const [roomKey, socketList] of Object.entries(connections)) {
//         const index = socketList.indexOf(socket.id);
//         if (index !== -1) {
//           // Notify others
//           for (let id of socketList) {
//             io.to(id).emit("user-left", socket.id);
//           }

//           // Remove socket
//           connections[roomKey].splice(index, 1);

//           if (connections[roomKey].length === 0) {
//             delete connections[roomKey];
//           }
//         }
//       }

//       delete timeOnline[socket.id];
//     });
//   });

//   return io;
// };

// export default connectToServer;
