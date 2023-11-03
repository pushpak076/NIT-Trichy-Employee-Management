const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    staffNo: {
      type: String,
      required: [true, "Please add the Emp name"],
    },
    webmail: {
      type: String,
      required: [true, "Please add the Emp email address"],
      unique: [true, "Webmail adress already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the Emp password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Staff', staffSchema);