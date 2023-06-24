import { STATUS } from "../constants/config.js";
import { UserModel } from "../models/UserModel.js";
import { genPassword } from "../utils/authUtils.js";

const loginController = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      status: STATUS.sucess,
      message: "Logged In",
      data: { username: req?.session?.user },
    });
  } catch (error) {
    next(error);
  }
};

const loginFailureController = async (req, res, next) => {
  return res.status(401).json({
    success: false,
    status: STATUS.failure,
    message: "No such user found",
    data: {},
  });
};

const registerController = async (req, res, next) => {
  try {
    const saltHash = genPassword(req.body?.password);
    const user = await UserModel.create({
      username: req.body.username,
      hash: saltHash.hash,
      salt: saltHash.salt,
    });

    if (user?._id) {
      return res.status(200).json({
        success: true,
        status: STATUS.sucess,
        message: "User created",
        data: { username: user.username },
      });
    }

    return res.status(400).json({
      success: false,
      status: STATUS.failure,
      message: "Could not create user",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export { loginController, registerController, loginFailureController };
