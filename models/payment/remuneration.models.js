const mongoose = require("mongoose");
const { Schema } = mongoose;

const remunerationSchema = new Schema(
  {
    remunerationUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    remunerationAmount: {
      type: Number,
      required: true,
    },
    remunerationDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Remuneration", remunerationSchema);