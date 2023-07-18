const { UNEXPECTED_ERROR } = require("../../../constants/messages");

async function getServerTime(req, res, next) {
  try {
    function sendServerTime(req, res) {
      let messageId = 0;

      const intervalId = setInterval(() => {
        res.write(`id: ${messageId}\n`);
        res.write(`data: ${Date.now()}\n\n`);
        messageId += 1;
      }, 1000);

      req.on("close", () => {
        clearInterval(intervalId);
      });
    };

    const headers = {
      "Content-Type": "text/event-stream",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache",
    };

    res.writeHead(200, headers);
    res.write("\n");

    sendServerTime(req, res);
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
}

module.exports = getServerTime;
