const { Server } = require("socket.io");
const { CLIENT_URL } = require("./envConfig");

const connectSocketIo = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: CLIENT_URL,
      allowedHeaders: ["user-id", "product-id"],
      credentials: true
    }
  });

  app.set("io", io);

  const auction = io.of("/auction");
  const chat = io.of("/chat");

  auction.on("connection", (socket) => {
    const req = socket.request;
    const roomId = req.headers["product-id"];

    socket.join(roomId);

    socket.on("bid", (receivedBidInfo) => {
      console.log("bid 이벤트로 받은 객체 메시지: ", receivedBidInfo);
      auction.to(roomId).emit("bid", receivedBidInfo);
    });

    socket.on("auctionClose", (receivedData) => {
      console.log("auctionClose 이벤트로 받은 객체 메시지: ", receivedData);
      auction.to(roomId).emit("auctionClose", receivedData);
    });

    socket.on("disconnect", () => {
      console.log("auction 네임스페이스 접속 해제")
    });
  });

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
