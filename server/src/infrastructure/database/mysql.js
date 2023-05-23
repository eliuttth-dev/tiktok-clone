const mysql = require("mysql2/promise");
const config = require("../../config");

async function getConnection(db) {
  const connection = await mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: function () {
      switch (db) {
        case db === "user_db":
          return "user_db";

        case db === "payment_db":
          return "payment_db";

        case db === "videos_db":
          return "videos_db";
      }
    },
  });
  return connection;
}

module.exports = {
  getConnection,
};
