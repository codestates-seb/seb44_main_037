const { Server } = require("socket.io");
const { CLIENT_URL } = require("./envConfig");

const connectSocketIo = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: CLIENT_URL,
      allowedHeaders: ["user-id"],
      credentials: true
    }
  });

  app.set("io", io);

  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    const req = socket.request;
    const roomId = req.headers["user-id"];

    socket.join(roomId);

    socket.on("message", (receivedMessage) => {
      console.log("message 이벤트로 받은 객체 메시지: ", receivedMessage);
      chat.to(receivedMessage.receiver._id).emit("message", receivedMessage);
    });

    socket.on("disconnect", () => {
      console.log("chat 네임스페이스 접속 해제")
      socket.leave(roomId);
    });
  });
}

module.exports = connectSocketIo;
