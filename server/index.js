import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import * as io from "socket.io";
import { connectDB } from "./config/db.js";
import { userRoute } from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import { messageRoute } from "./routes/messageRoutes.js";
import { conversationRoute } from "./routes/conversationRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 1000000,
  })
);

const port = process.env.PORT || 3030;

if (process.env.NODE_ENV === "development") {
  app.use(express.static("../client/dist"));
  app.get("/", (req, res) => {
    let filePath = path.resolve(__dirname, "../client/dist", "index.html");
    res.sendFile(filePath);
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello");
  });
}
app.use("/api/users", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);

export const __dirname = path.resolve();
console.log(__dirname);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});

var socketIo = new io.Server(server, {
  cors: {
    origin: ["https://mern-chat-egjq.onrender.com"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

socketIo.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    socketIo.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    socketIo.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    socketIo.emit("getUsers", users);
  });
});
