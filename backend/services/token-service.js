const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/refreshTokenModel");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshTokenModel.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  async findRefreshToken(userId, refreshToken) {
    //  db querying
    return await refreshTokenModel.findOne({
      _id: userId,
      token: refreshToken,
    });
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refreshTokenModel.updateOne(
      { userId: userId },
      { token: refreshToken }
    );
  }
}

module.exports = new TokenService();
