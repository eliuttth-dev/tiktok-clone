const { createUser } = require("../../domain/repositories/userRepository");
const mysql = require("mysql2/promise");
const config = require("../../config");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const newUser = {
      name,
      email,
      password,
      createAt: new Date(),
    };

    await createUser(newUser);

    res.redirect("/home");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  register,
};
