const List = require("../models/List");

const insertList = (data) => {
  const list = new List(data);
  return list.save();
};

const getList = (type, genre) => {
  let list = [];
  if (type) {
    if (genre) {
      list = List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type: type, genre: genre } },
      ]);
    } else {
      list = List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type: type } },
      ]);
    }
  } else {
    list = List.aggregate([{ $sample: { size: 10 } }]);
  }
  return list;
};

const deleteList = (id) => {
  return List.findByIdAndDelete(id);
};

module.exports = {
  insertList,
  getList,
  deleteList,
};
