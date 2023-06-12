class UserDto {
  id;
  phone;
  name;
  avatar;
  isActivated;
  createdAt;

  constructor(user) {
    this.id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.avatar = user.avatar;
    this.isActivated = user.isActivated;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
