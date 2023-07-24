require("./config/connectMongoose");

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const chatRoomRouter = require("./routes/chat");
const { CLIENT_URL } = require("./config/envConfig");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: CLIENT_URL,
  methods: ["GET", "POST", "OPTIONS", "DELETE"],
  credentials: true,
  exposedHeaders: ["token"]
};

app.use(cors(corsOptions));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/chats", chatRoomRouter)

app.use((req, res, next) => {
  next(createError(404));
});

app.use((error, req, res, next) => {
  console.log('문제가 된 request:', req.url)
  console.log(error)
  error.result = "error";
  res.status(error.status || 500);
  res.send(error);
});

module.exports = app;
