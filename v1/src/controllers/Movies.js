const {
  insertMovie,
  list,
  get,
  updateMovie,
  deleteMovie,
  randomMovie,
} = require("../services/Movies");
const httpStatus = require("http-status");

const create = (req, res) => {
  const { isAdmin, ...info } = req.user._doc;
  if (isAdmin) {
    insertMovie(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You are not allowed to add movie!" });
  }
};

const update = (req, res) => {
  const { isAdmin, ...info } = req.user._doc;
  if (isAdmin) {
    updateMovie(req.body, req.params.id)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You are not allowed to add movie!" });
  }
};

const deleteMovieInfo = (req, res) => {
  const { isAdmin, ...info } = req.user._doc;
  if (isAdmin) {
    deleteMovie(req.params.id)
      .then((response) => {
        if (response) {
          res.status(httpStatus.OK).send({ message: "Movie deleted." });
        } else {
          res
            .status(httpStatus.NOT_FOUND)
            .send({ message: "Such a movie does not exist." });
        }
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You are not allowed to delete movie!" });
  }
};

const getMovie = (req, res) => {
  get(req.params.id)
    .then((movie) => {
      res.status(httpStatus.OK).json(movie);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const getMovies = (req, res) => {
  const { isAdmin, ...info } = req.user._doc;
  if (isAdmin) {
    list()
      .then((data) => {
        res.status(httpStatus.OK).json(data.reverse());
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You are not allowed to see all movies!" });
  }
};

const getRandomMovie = (req, res) => {
  randomMovie(req.query.type)
    .then((data) => {
      res.status(httpStatus.OK).json(data);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

module.exports = {
  create,
  update,
  deleteMovieInfo,
  getMovie,
  getMovies,
  getRandomMovie,
};
