const { INVALID_REQUEST, OK } = require("../../../constants/messages");
const ChatRoom = require("../../../models/ChatRoom");

async function createMessage(req, res, next) {
  const { text, roomId } = req.body;
  const user = req.user;
  const now = Date.now();

  try {
    const chatRoom = await ChatRoom.findOne({ _id: roomId });
    const isValidText = text && text.length <= 500;

    if (!isValidText || !roomId || !chatRoom) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INVALID_REQUEST
        });
    }

    const filter = { _id: roomId };
    const update = {
      $push: {
        messages: {
          user: {
            userId: user._id,
            nickname: user.nickname
          },
          text,
          createdAt: now
        }
      }
    };

    const updatedChatRoom = await ChatRoom
      .findOneAndUpdate(filter, update, { new: true })
      .populate(["product"]);
    const newMessage = updatedChatRoom.messages[updatedChatRoom.messages.lengh - 1];

    return res
      .status(200)
      .send({
        result: OK,
        payload: { updatedChatRoom, newMessage }
      });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: error });
  }
}

module.exports = createMessage;
