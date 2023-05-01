const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
// const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messagesRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();

app.use(express.json({ limit: "50mb" }));
// app.use(bodyParser.json({ limit: '200kb' }));

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST, PUT, PATCH, DELETE",
};

app.use(fileUpload());
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  req.connection.setNoDelay(true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Expose-Headers", "agreementrequired");

  next();
});

app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running..");
});

// Error Handling middlewares

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);

    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chatId;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
      socket.emit("update feed", user);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
