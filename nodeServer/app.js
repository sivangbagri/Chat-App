// node server which will handle socket.io connections
const io = require("socket.io")(8000);
// const express = require("express");
// const cors = require("cors");

// const corsOptions = {
//   origin: "http://127.0.0.1:5500/",
// };

// const app = express();
// app.use(cors(corsOptions));
const users = {};
io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    console.log("workingF", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name); // to all except the one joined
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
});
socket.on("disconnet", (message) => {
  socket.broadcast.emit("left", users[socket.id]);
  delete users[socket.id];
});
