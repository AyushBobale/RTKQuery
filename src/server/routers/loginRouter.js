import {
  getUserDataController,
  loginController,
  loginFailureController,
  registerController,
} from "../controllers/loginController.js";

import LocalStrategy from "passport-local";
import { Router } from "express";
import { UserModel } from "../models/UserModel.js";
import passport from "passport";
import { validatePassword } from "../utils/authUtils.js";

// Passport set up ---------------------------------------------------------------------

const verifyCallback = async (username, password, done) => {
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user?._id) {
      return done(null, false);
    }
    const isValid = validatePassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    console.log("Log: Debug 1", userId);
    const user = await UserModel.findById(userId);
    console.log(!!user?._id);
    if (user?._id) {
      done(false, user);
    } else {
      done(false, null);
    }
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});
// ---------------------------------------------------------------------
const loginRouter = Router();

loginRouter.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login/failure" }),
  loginController
);
loginRouter.get(
  "/user_data",
  passport.authenticate("local", { failureRedirect: "/auth/login/failure" }),
  getUserDataController
);
// non auth routes
loginRouter.get("/login/failure", loginFailureController);
loginRouter.post("/register", registerController);

export { loginRouter };
