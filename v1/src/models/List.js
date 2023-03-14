const Mongoose = require("mongoose");

const ListSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  {
    timestamps: true, versionKey: false
  }
);
module.exports = Mongoose.model("list", ListSchema);
