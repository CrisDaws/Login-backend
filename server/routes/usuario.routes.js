const express = require("express");
const router = express.Router();

const usuario = require("../controllers/usuario.controller");

router.post("/usuario/iniciarSesion", usuario.iniciarSesion);

router.post("/usuario/registrar", usuario.registrarUsuario);

module.exports = router;