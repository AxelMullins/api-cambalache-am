const mongoose = require("mongoose");
const { Schema } = mongoose;

const repoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    language: {
      type: String,
      enum: ["HTML5", "CSS3", "JavaScript", "React Js", "Node Js", "Express"],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: { type: String },
    url: {
      github: { type: String },
      deploy: { type: String },
    },
  }
);

const Repo = mongoose.model('Repo', repoSchema);
module.exports = { Repo };