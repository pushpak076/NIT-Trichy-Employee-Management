const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Staff"
    },
    name: {
      type: String,
      required: [true, "Please add the staff name"],
    },
    relationship: {
      type: String,
      required: [true, "Please add relationship"],
    },
    work_detail: {
      type: String,
      required: [true, "Please add working details"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Family", familySchema);
