const mysql = require("mysql2/promise");
const User = require("../../../src/domain/models/user");
const {
  createUser,
  updateUser,
} = require("../../../src/domain/repositories/userRepository");
const config = require("../../../src/config");

jest.mock("mysql2/promise");

const configUserDB = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.userDb,
  port: config.database.port,
};

// Test when create a new user
describe("createUser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new user and return an instance of User", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      createAt: "2023-05-22",
    };

    const connectionMock = {
      execute: jest.fn().mockResolvedValue([[{ insertId: 1 }]]),
      end: jest.fn(),
    };

    mysql.createConnection.mockResolvedValue(connectionMock);

    const result = await createUser(userData);

    expect(mysql.createConnection).toHaveBeenCalledWith(configUserDB);

    expect(connectionMock.execute).toHaveBeenCalledWith(
      "INSERT INTO users (username, user_email, user_password,create_at) VALUES (?, ?, ?, ?)",
      [userData.name, userData.email, userData.password, userData.createAt]
    );

    expect(connectionMock.end).toHaveBeenCalled();

    expect(result).toBeInstanceOf(User);
    expect(result.username).toBe(userData.name);
    expect(result.email).toBe(userData.email);
    expect(result.password).toBe(userData.password);
  });
});

// Test when update a user
describe("updateUser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update a user and return an instance of User", async () => {
    const userId = 1;
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "newpassword",
      createAt: "2023-05-22",
    };

    const connectionMock = {
      execute: jest.fn(),
      end: jest.fn(),
    };

    mysql.createConnection.mockResolvedValue(connectionMock);

    const result = await updateUser(userId, userData);

    expect(mysql.createConnection).toHaveBeenCalledWith(configUserDB);

    expect(connectionMock.execute).toHaveBeenCalledWith(
      "UPDATE users SET username = ?, user_email = ?, user_password = ? WHERE id = ?",
      [userData.name, userData.email, userData.password, userId]
    );

    expect(connectionMock.end).toHaveBeenCalled();

    expect(result).toBeInstanceOf(User);
    expect(result.username).toBe(userData.name);
    expect(result.email).toBe(userData.email);
    expect(result.password).toBe(userData.password);
  });
});
