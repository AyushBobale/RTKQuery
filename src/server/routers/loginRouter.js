import {
  loginController,
  registerController,
} from "../middlewares/loginMiddleware.js";

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
    const user = await UserModel.findById(userId);
    if (user?._id) {
      done(null, user);
    } else {
      done(null, null);
    }
  } catch (error) {
    done(error, null);
  }
});
// ---------------------------------------------------------------------
const loginRouter = Router();

loginRouter.post("/login", loginController);
loginRouter.post("/register", registerController);

export { loginRouter };
