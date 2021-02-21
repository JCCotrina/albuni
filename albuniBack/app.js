"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//cargar rutas
const testRouters = require("./routes/test");

//middlewares_ un metodo q se ejecute antes de llegar a un controlador
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors // configurar cabeceras http
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    next();
});

//rutas
app.use("/api", testRouters);

//exportar
module.exports = app;
