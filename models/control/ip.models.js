const mongoose = require("mongoose");
const { Schema } = mongoose;

const ipSchema = new Schema(
  {
    ipname: {
      type: String,
      required: true,
    },
    ipCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Ip", ipSchema);