const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment-timezone");

const workDateSchema = new Schema(
  {
    workStartTime: {
      type: String,
      required: true,
      set: (date) =>
        moment.tz(date, "America/Guayaquil").format("YYYY-MM-DD HH:mm:ss"),
    },
    workEndTime: {
      type: String,
      required: true,
      set: (date) =>
        moment.tz(date, "America/Guayaquil").format("YYYY-MM-DD HH:mm:ss"),
    },
    workStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("WorkDate", workDateSchema);
