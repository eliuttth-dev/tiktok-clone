const express = require("express");
const app = express();
const config = require("./src/config");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// Server
app.listen(config.port, () => {
  console.log("Running on port", config.port);
});
