import "dotenv/config";

import { STATUS } from "./constants/config.js";
import connectDB from "./db/conn.js";
import cors from "cors";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import express from "express";

const PORT = process.env.PORT || 5000;
connectDB();
//
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      process.env.CORS_DOMAIN,
      "http://192.168.1.5:3000",
      "http://localhost:3000",
    ],
  })
);

// server status check
app.get("/", (req, res, next) => {
  res.send({
    sucess: true,
    status: STATUS.sucess,
    message: "Server running",
    data: {},
  });
});

// Routers

// error logging and handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
