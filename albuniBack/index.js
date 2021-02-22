"use strict";
const mongoose = require("mongoose");
const app = require("./app");

mongoose.Promise = global.Promise;
const urlDB =
    "mongodb+srv://userQhatu:softwareQhatu@qhatu.5zrri.mongodb.net/qhatuDB?retryWrites=true&w=majority";

//Conexion Database
exports.dataBaseConection = (PORT) => {
    mongoose
        .connect(urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log("Conectado");
            //crear servidor
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`);
            });
        })
        .catch((err) => console.log(err));
};
