require("dotenv").config();

const config = {
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    userDb: process.env.DB_USER_DB,
    paymentDb: process.env.DB_PAYMENT_DB,
    videosDb: process.env.DB_VIDEOS_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};

module.exports = config;
