var cluster = require("cluster");
const server = require("./index");

// All worker processes have an http server.
//global.value +=1;
console.log(cluster.worker.id);
let num = cluster.worker.id; //Math.floor(Math.random() * 100) + 10;
console.log(`Listening on 800${num}`);
server.dataBaseConection(8000 + num);
