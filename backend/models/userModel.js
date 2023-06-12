var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    phone: { type: String, required: true },

    name: { type: String, required: false },
    avatar: {
      type: String,
      required: false,
      get: (avatar) => {
        if (avatar) {
          return `${process.env.BASE_URL}${avatar}`;
        }
      },
      // In JavaScript, a getter function is a special type of function that is used to retrieve the value of an object's property. It allows you to define custom logic for accessing a property, instead of directly accessing the property value.
    },

    isActivated: { type: Boolean, required: false, default: false },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("User", UserSchema, "users");
