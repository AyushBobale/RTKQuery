import "dotenv/config";

import MongoStore from "connect-mongo";
import { STATUS } from "./constants/config.js";
import connectDB from "./db/conn.js";
import cors from "cors";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
import express from "express";
import { loginRouter } from "./routers/loginRouter.js";
import passport from "passport";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

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
    credentials: true,
  })
);
app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// server status check
app.get("/", (req, res, next) => {
  res.send({
    success: true,
    status: STATUS.sucess,
    message: "Server running",
    data: {},
  });
});

// Routers
app.use("/auth", loginRouter);
// error logging and handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
