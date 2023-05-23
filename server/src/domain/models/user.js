class User {
  constructor(username, email, password, createAt) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.createAt = createAt;
  }
}

module.exports = User;
