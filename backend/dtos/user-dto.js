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
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : null;
    this.isActivated = user.isActivated;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
