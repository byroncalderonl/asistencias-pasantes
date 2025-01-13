const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment-timezone");

const attendanceSchema = new Schema(
  {
    attendanceUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendanceDate: {
      type: String,
      required: true,
      set: (date) =>
        moment.tz(date, "America/Guayaquil").format("YYYY-MM-DD HH:mm:ss"),
    },
    checkInTime: {
      type: String,
      set: (date) =>
        moment.tz(date, "America/Guayaquil").format("YYYY-MM-DD HH:mm:ss"),
    },
    checkOutTime: {
      type: String,
      set: (date) =>
        moment.tz(date, "America/Guayaquil").format("YYYY-MM-DD HH:mm:ss"),
    },
    lunchBreak: {
      type: Boolean,
      default: false,
    },
    attendanceStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    attendanceCard: {
      type: String,
      default: "default",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
