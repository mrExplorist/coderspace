const crypto = require("crypto");

class HashService {
  hashOtp(data) {
    // Hashing the OTP DATA

    // crypto.createHmac( algorithm, key, options )
    // https://www.geeksforgeeks.org/node-js-crypto-createhmac-method/

    return crypto
      .createHmac("sha256", process.env.HASH_SECRET)
      .update(data)
      .digest("hex");
  }
}

module.exports = new HashService();
