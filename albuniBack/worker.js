var http = require('http');
var cluster = require('cluster');
// All worker processes have an http server.
//global.value +=1;
console.log(cluster.worker.id)
let num = cluster.worker.id;//Math.floor(Math.random() * 100) + 10;
console.log(`Listening on 800${num}`);
http.Server(function (req, res){
    console.log("Client request")
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000+num);