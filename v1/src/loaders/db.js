const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
  console.log("DB connection is successful.");
});

const connectDB = async () => {
  await Mongoose.connect(
    `mongodb://127.0.0.1:27017/movieApp`,
    // `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = {
  connectDB,
};
