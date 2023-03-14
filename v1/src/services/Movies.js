const Movie = require("../models/Movie");

const insertMovie = (data) => {
  const movie = new Movie(data);
  return movie.save();
};

const list = () => {
  return Movie.find({});
};

const get = (id) => {
  const movie = Movie.findById(id);
  return movie;
};

const updateMovie = (data, id) => {
  const movie = Movie.findByIdAndUpdate(id, { $set: data }, { new: true });
  return movie;
};

const deleteMovie = (id) => {
  return Movie.findByIdAndDelete(id);
};

const randomMovie = (type) => {
  let movie;
  if (type === "series") {
    movie = Movie.aggregate([
      { $match: { isSeries: true } },
      { $sample: { size: 1 } },
    ]);
  } else {
    movie = Movie.aggregate([
      { $match: { isSeries: false } },
      { $sample: { size: 1 } },
    ]);
  }
  return movie;
};

module.exports = {
  insertMovie,
  list,
  get,
  updateMovie,
  deleteMovie,
  randomMovie,
};
