var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RoomSchema = new Schema(
  {
    topic: { type: "string", required: true },
    roomType: { type: "string", required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    speakers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema, "rooms");
