const User = require("../../../src/domain/models/user");

describe("User", () => {
  it("should initialize properties correctly", () => {
    const username = "John Doe";
    const email = "johndoe@example.com";
    const password = "password123";
    const createAt = "2023-05-22";

    const user = new User(username, email, password, createAt);

    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.createAt).toBe(createAt);
  });
});
