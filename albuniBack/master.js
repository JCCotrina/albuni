/* var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var port = 65000

"use strict";
var mongoose = require("mongoose");
var app = require("./app");
const os = require("os");

mongoose.Promise = global.Promise;
const urlDB =
  "mongodb+srv://userQhatu:softwareQhatu@qhatu.5zrri.mongodb.net/qhatuDB?retryWrites=true&w=majority";

exports.TestDemocracy = ()=>{
    if (cluster.isMaster) {
        // Fork workers.
        for (var i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      
      
        cluster.on('exit', function(worker, code, signal) {
          console.log("worker ${worker.process.pid} died");
          cluster.fork();
        });
      } else {
          mongoose
              .connect(urlDB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
              })
              .then(() => {
                  let number = Math.floor(Math.random() * 100) + 1;
                app.listen(port + number, () => {
                  console.log("Servidor corriendo en http://localhost:3800", number);
                });
      
                
              var express = require('express');
              var http = require('http'); */
      
              // init app
              /* var app = express();
      
              function createServer(app) {
                  return http.createServer(app);
              }
      
              app.locals.server = createServer(app);
      
              app.locals.server.listen(port+number, function() {
                  console.info("server online",number);
              }); */
 /*      
      
              })
              .catch((err) => console.log(err));
      
      
          
      }
} */

/* var cluster = require('cluster');
var app = require('./app2');

cluster.schedulingPolicy = cluster.SCHED_RR;

exports.testCluster=()=>{
    if(cluster.isMaster){
        var cpuCount = require('os').cpus().length;
        for (var i = 0; i < cpuCount; i += 1) {
          cluster.fork();
        }
      }else{
        app(cluster);
      }
      
      cluster.on('fork', function(worker) {
      console.log('forked -> Worker %d', worker.id);
      });
}
 */
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var startCluster = function(){
  cluster.setupMaster({ 
    exec: __dirname + '/worker.js'
  });

  if (cluster.isMaster) {
    // CREATE A CLUSTER OF FORKED WORKERS, ONE PER CPU    
    for (var i = 0; i < numCPUs; i++) {
       cluster.fork();
    }

  } 
  return
}
module.exports = startCluster;