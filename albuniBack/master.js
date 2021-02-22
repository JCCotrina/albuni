var cluster = require("cluster");
var numCPUs = require("os").cpus().length;

var startCluster = function () {
    cluster.setupMaster({
        exec: __dirname + "/worker.js",
    });

    if (cluster.isMaster) {
        // CREATE A CLUSTER OF FORKED WORKERS, ONE PER CPU
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    }
    return;
};
module.exports = startCluster;
