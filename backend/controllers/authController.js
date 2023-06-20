// AuthController class is defined with a single method called sendOtp(). This class is intended to handle authentication-related functionality, such as sending OTPs (One-Time Passwords).

const OtpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const otpService = require("../services/otp-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

class AuthController {
  async sendOtp(req, res) {
    //LOGIC
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone Field is required" });
    }

    // First we have to generate RANDOM OTP OF 4 DIGIT  WE CAN USE MATH.RANDOM FN OF JAVASCRIPT OR NODE INBUILT METHOD

    // For making our code modular so build different controllers for each functionality

    // const otp = await OtpService.generateOtp();
    const otp = 7777;

    // HASH

    const ttl = 1000 * 60 * 2; // 2min
    const expires = Date.now() * ttl;
    const data = `${phone}.${otp}.${expires}`;

    const hash = hashService.hashOtp(data);

    //Implementing send OTP service

    try {
      // await OtpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
        // otp,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "message sending failed" });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All fields are required!" });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP expired!" });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    // Database query
    let user;

    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Db error" });
    }

    // Generate JWT Token

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      isActivated: false,
    });

    // storing refreshToken in database
    await tokenService.storeRefreshToken(refreshToken, user._id);

    // Storing refreshToken and accessToken in cookie

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
    });

    const userDto = new UserDto(user);

    res.json({ user: userDto, auth: true }); // sending user to client userDto represents a Data Transfer Object (DTO) or a simplified version of a user object that is intended to send to the client. It could contain selected properties or fields from the original user object, tailored for specific communication needs.
    // auth is a boolean property set to true, indicating that the user is authenticated or authorized
  }

  // Refreshing accessToken with the help of refreshToken so that after page refresh we will not get logged out

  async refresh(req, res) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies; // getting refreshToken from cookie

    // check if refreshToken is valid

    let userData;

    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
      // console.log(userData);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // check  if the refreshToken is in database

    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );

      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal db error !" });
    }

    //check if valid user ,  confirming that user in refreshToken is in database

    const user = await userService.findUser({ _id: userData._id });

    if (!user) {
      return res.status(404).json({ message: "No User" });
    }

    // Generate new tokens

    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });

    // update refreshToken in db

    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (error) {
      return res.status(500).json({ message: "Internal db error !" });
    }

    // put in cookie

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
    });

    // send response to client
    const userDto = new UserDto(user);

    res.json({ user: userDto, auth: true }); // data that we are sending whenever refreshToken is updated and sent to the client
  }

  // invalidating their authentication credentials. It involves removing the user's access token, clearing any stored user data, and redirecting the user to a designated logout page or the login page.
  async logout(req, res) {
    const { refreshToken } = req.cookies;
    // delete refresh token from db
    await tokenService.removeToken(refreshToken);
    // delete cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ user: null, auth: false });
  }
}

module.exports = new AuthController();

//The statement module.exports = new AuthController() exports an instance of the AuthController class as the module's public interface. By using new AuthController(), a new instance of the AuthController class is created, and this instance is what gets exported.
