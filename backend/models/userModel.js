var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    phone: { type: String, required: true },
    Activated: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema, "users");
