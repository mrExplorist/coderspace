var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RefreshSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Refresh", RefreshSchema, "tokens");
