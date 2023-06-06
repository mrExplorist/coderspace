const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    // Parsing accessToken from the cookie check validity of token
    // Getting cookie from the request

    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.verifyAccessToken(accessToken);

    if (!userData) {
      throw new Error();
    }

    req.user = userData;

    console.log(userData);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
