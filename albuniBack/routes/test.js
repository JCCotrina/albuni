const express = require("express");
var api = express.Router();
const testControllers = require("../controllers/test");

api.post("/subir-foto", testControllers.subirFoto);
api.post("/get-fotos", testControllers.getFotos);
api.post("/like", testControllers.likeDislike);
api.post("/say-hello", testControllers.sayHello);

module.exports = api;
