const { OK, FAILED } = require("../../../constants/messages");
const ChatRoom = require("../../../models/ChatRoom");

async function getAllChatRooms(req, res, next) {
  const user = req.user;

  try {
    const chatRooms = await ChatRoom
      .find({
        $or: [
          { "seller._id": `${user._id}` },
          { "buyer._id": `${user._id}` },
        ]
      })
      .populate(["product"]);

    if (!chatRooms) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: "채팅방을 찾을 수 없습니다."
        });
    }

    res
      .status(200)
      .send({ result: OK, payload: { chatRooms } });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: error });
  }
}

module.exports = getAllChatRooms;
