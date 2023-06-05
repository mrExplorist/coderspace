// This service will check whether the User exists or not

const userModel = require("../models/userModel");

class UserService {
  async findUser(filter) {
    const user = await userModel.findOne(filter);
    return user;
  }
  async createUser(data) {
    const user = await userModel.create(data);
    return user;
  }
}

module.exports = new UserService();
