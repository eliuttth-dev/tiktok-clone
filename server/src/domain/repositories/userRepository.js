const mysql = require("mysql2/promise");
const User = require("../models/user");
const config = require("../../config");

const configUserDB = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.userDb,
  port: config.database.port,
};

// Create a new User
async function createUser(userData) {
  const connection = await mysql.createConnection(configUserDB);

  // Check if the user exist before create it
  const [existingUsers] = await connection.execute(
    "SELECT * FROM users WHERE username = ? OR user_email = ?",
    [userData.name, userData.email]
  );

  // Throw error and end connection
  if (existingUsers.length > 0) {
    await connection.end();
    throw new Error("User already exists");
  }
  // Create new user into Database
  await connection.execute(
    "INSERT INTO users (username, user_email, user_password,create_at) VALUES (?, ?, ?, ?)",
    [userData.name, userData.email, userData.password, userData.createAt]
  );

  await connection.end();

  return new User(
    userData.name,
    userData.email,
    userData.password,
    userData.createAt
  );
}

// Update a User
async function updateUser(userId, userData) {
  const connection = await mysql.createConnection(configUserDB);
  await connection.execute(
    "UPDATE users SET username = ?, user_email = ?, user_password = ? WHERE id = ?",
    [userData.name, userData.email, userData.password, userId]
  );
  await connection.end();

  return new User(userData.name, userData.email, userData.password);
}

module.exports = {
  createUser,
  updateUser,
};
