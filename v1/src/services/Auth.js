const User = require("../models/User");

const loginUser = (data) => {
  return User.findOne(data);
};

const insertUser = (data) => {
  const user = new User(data);
  return user.save();
};

module.exports = {
  loginUser,
  insertUser,
};
