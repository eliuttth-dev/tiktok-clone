const express = require("express");
const { register } = require("../controllers/registerController");

const router = express.Router();

// Ruta para el registro de usuario
router.post("/register", register);

module.exports = router;
