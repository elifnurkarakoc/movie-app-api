const { insertList, getList, deleteList } = require("../services/Lists");
const httpStatus = require("http-status");

const index = (req, res) => {
  getList(req.query.type, req.query.genre)
    .then((data) => {
      res.status(httpStatus.OK).json(data);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const create = (req, res) => {
  const { isAdmin, ...info } = req.user._doc;
  if (isAdmin) {
    insertList(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You are not allowed to add list!" });
  }
};

const deleteMovieList = (req, res) => {
  const { isAdmin, ...info } = req.user._doc;
  if (isAdmin) {
    deleteList(req.params.id).then((response) => {
      if (response) {
        res.status(httpStatus.OK).send({ message: "List has been deleted." });
      } else {
        res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "Such a list does not exist." });
      }
    });
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You are not allowed to delete list!" });
  }
};
module.exports = { index, create, deleteMovieList };
