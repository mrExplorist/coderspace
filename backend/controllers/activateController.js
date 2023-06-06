const Jimp = require("jimp");
const path = require("path");
const userService = require("../services/user-service");
const UserDto = require("../dtos/user-dto");
class ActivateController {
  async activate(req, res) {
    // Activation Logic

    const { name, avatar } = req.body;

    if (!name || !avatar) {
      res.status(400).json({ message: "All fields are required!!" });
    }

    //Image Base64

    const buffer = Buffer.from(
      avatar.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    //the generated imagePath may look like: 1622723012345-987654321.png, where 1622723012345 is the timestamp and 987654321 is the random number.

    try {
      const jimpResp = await Jimp.read(buffer);

      jimpResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (error) {
      res.status(500).json({ message: "Could not process the image" });
    }

    const userId = req.user._id;
    // Update user

    try {
      const user = await userService.findUser({ _id: userId });

      if (!user) {
        res.status(404).json({ message: "User not found !" });
      }

      user.isActivated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ user: new UserDto(user), auth: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "db error: User not created in database" });
    }
  }
}

module.exports = new ActivateController();
