const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userLastName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userRol: {
      type: Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
    },
    codeCard: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ userEmail: 1 }, { unique: true });
userSchema.index({ codeCard: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
