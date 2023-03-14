const User = require("../models/User");

const listUser = (query) => {
  return query ? User.find().sort({ _id: -1 }).limit(10) : User.find();
};

const updateUser = (data, id) => {
  const user = User.findByIdAndUpdate(id, { $set: data }, { new: true });
  return user;
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

const getUser = (id) => {
  const user = User.findById(id);
  return user;
};

const getStats = () => {
  const data = User.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  return data;
};

module.exports = {
  listUser,
  updateUser,
  deleteUser,
  getUser,
  getStats,
};
