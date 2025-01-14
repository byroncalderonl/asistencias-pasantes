const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    paymentUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentRemuneration: {
      type: Schema.Types.ObjectId,
      ref: "Remuneration",
    },
    paymentTotal: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentDescription: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
