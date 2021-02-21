"use strict";
var mongoose = require("mongoose");
var app = require("./app");
var PORT = 3800;
const os = require("os");
const cluster = require("cluster");
const clusterWorkerSize = os.cpus().length;

mongoose.Promise = global.Promise;
const urlDB =
  "mongodb+srv://userQhatu:softwareQhatu@qhatu.5zrri.mongodb.net/qhatuDB?retryWrites=true&w=majority";

//Conexion Database
exports.dataBaseConection = () => {
  if (clusterWorkerSize > 1) {
    if (cluster.isMaster) {
      for (let i = 0; i < clusterWorkerSize; i++) {
        cluster.fork();
      }

      cluster.on("exit", function (worker) {
        console.log("Worker", worker.id, " has exitted.");
      });
    } else {
      mongoose
        .connect(urlDB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        })
        .then(() => {
          console.log("Conectado");
          let num = Math.floor(Math.random() * 100) + 1;
          //crear servidor
          app.listen(PORT + num, () => {
            console.log("Servidor corriendo en http://localhost:3800", num);
          });
        })
        .catch((err) => console.log(err));
    }
  } else {
    mongoose
      .connect(urlDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Conectado");

        //crear servidor
        app.listen(PORT, () => {
          console.log("Servidor corriendo en http://localhost:3800");
        });
      })
      .catch((err) => console.log(err));
  }
};
