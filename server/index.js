const express = require("express");
const app = express();
const config = require("./src/config");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./src/app/routes/userRoutes");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoutes);

app.get("/home", (req, res) => {
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});
app.get("/res", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Server
app.listen(config.port, () => {
  console.log("Running on port", config.port);
});
