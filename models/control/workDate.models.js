const mongoose = require("mongoose");
const { Schema } = mongoose;

const workDateSchema = new Schema(
  {
    workStartTime: {
      type: Date,
      required: true,
    },
    workEndTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("WorkDate", workDateSchema);
