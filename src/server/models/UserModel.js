import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
});
const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
