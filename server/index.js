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

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/users", userRoute);
app.use("/api/message", messageRoute);

export const __dirname = path.resolve();
console.log(__dirname);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});

var socketIo = new io.Server(server);
