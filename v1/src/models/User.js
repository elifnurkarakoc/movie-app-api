const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true, versionKey: false
  }
);
module.exports = Mongoose.model("user", UserSchema);
