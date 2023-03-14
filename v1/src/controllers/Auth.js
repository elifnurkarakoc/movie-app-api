const { insertUser, loginUser } = require("../services/Auth");

const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");

const httpStatus = require("http-status");

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  //console.log(req.body);
  loginUser(req.body).then((user) => {
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "Such a user does not exist." });
    }

    user = {
      ...user.toObject(),
      tokens: {
        access_token: generateAccessToken(user),
        refresh_token: generateRefreshToken(user),
      },
    };
    delete user.password;
    res.status(httpStatus.OK).send(user);
  });
};

const create = (req, res) => {
  //console.log(req.body);
  req.body.password = passwordToHash(req.body.password);
  insertUser(req.body)
    .then((user) => {
      user = {
        ...user.toObject(),
      };
      delete user.password;
      res.status(httpStatus.CREATED).send(user);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

module.exports = {
  create,
  login,
};
