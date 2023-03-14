const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config");
const loaders = require("./loaders");

const {
  AuthRoutes,
  UserRoutes,
  MovieRoutes,
  ListRoutes,
} = require("./api-routes");

config();
loaders();

const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(helmet());

app.use("/auth", AuthRoutes.router);
app.use("/users", UserRoutes.router);
app.use("/movies", MovieRoutes.router);
app.use("/lists", ListRoutes.router);
app.listen(process.env.APP_PORT, () => {
  console.log("Movie API Server is running on", process.env.APP_PORT);
});
