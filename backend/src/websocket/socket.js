const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    console.log("Client connected");
  });
};

const emitLog = (log) => {
  if (io) {
    io.emit("execution-log", log);
  }
};

module.exports = { initSocket, emitLog };