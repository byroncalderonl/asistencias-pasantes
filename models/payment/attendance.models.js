const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    attendanceUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendanceDate: {
      type: Date,
      required: true,
    },
    checkInTime: {
      type: Date,
    },
    checkOutTime: {
      type: Date,
    },
    lunchBreak: {
      type: Boolean,
      default: false,
    },
    attended: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
