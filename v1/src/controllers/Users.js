const {
  listUser,
  updateUser,
  deleteUser,
  getUser,
  getStats,
} = require("../services/Users");

const { passwordToHash } = require("../scripts/utils/helper");

const httpStatus = require("http-status");

const update = (req, res) => {
  const { _id: id, isAdmin, ...info } = req.user._doc;
  if (id === req.params.id || isAdmin) {
    if (req.body.password) {
      req.body.password = passwordToHash(req.body.password);
    }
    updateUser(req.body, req.params.id)
      .then((user) => {
        user = {
          ...user.toObject(),
        };
        delete user.password;
        res.status(httpStatus.OK).json(user);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You can update only your account!" });
  }
};

const deleteUserAccount = (req, res) => {
  const user = req.user._doc;
  if (user._id === req.params.id || user.isAdmin) {
    deleteUser(req.params.id)
      .then((response) => {
        if (response) {
          res
            .status(httpStatus.OK)
            .send({ message: "Your account has been deleted." });
        } else {
          res
            .status(httpStatus.NOT_FOUND)
            .send({ message: "Such a user does not exist." });
        }
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You can delete only your account!" });
  }
};

const getUserInfo = (req, res) => {
  getUser(req.params.id)
    .then((user) => {
      user = {
        ...user.toObject(),
      };
      delete user.password;
      res.status(httpStatus.OK).json(user);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const index = (req, res) => {
  const query = req.query.new;
  const { isAdmin, ...info } = req.user._doc;
  if (isAdmin) {
    listUser(query)
      .then((data) => {
        res.status(httpStatus.OK).json(data);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "You are not allowed to see all users!" });
  }
};

const getUserStats = (req, res) => {
  getStats()
    .then((data) => {
      res.status(httpStatus.OK).json(data);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
module.exports = {
  index,
  update,
  deleteUserAccount,
  getUserInfo,
  getUserStats,
};
