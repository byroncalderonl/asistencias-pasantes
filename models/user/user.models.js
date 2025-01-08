const mongose = require("mongoose");
const { Schema } = mongose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongose.model("User", userSchema);
