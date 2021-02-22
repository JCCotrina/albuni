/**
 * Basic example usage of democracy.js
 *
 * Test on your local machine by running three instances of this test script,
 * with the parameter being the port. You can then test it by killing the leader
 * process to see the re-election happen between the remaining two.
 *
 * node test.js 12345
 * node test.js 12346
 * node test.js 12347
 */
const server = require("./index");
var cluster = require("cluster");
var Democracy = require("./democracy");
var startCluster = require("./master.js");

var dem = new Democracy({
    source: "192.168.0.19:" + process.argv[2],
    peers: ["0.0.0.0:12345", "192.168.0.25:12346", "0.0.0.0:12347"],
});

dem.on("added", function (data) {
    console.log("Added: ", data);
});

dem.on("removed", function (data) {
    console.log("Removed: ", data);
    if (dem.isLeader) {
        cluster.disconnect();
    }
});

dem.on("elected", function (data) {
    console.log("You are elected leader!");
    startCluster();
});

dem.on("leader", function (data) {
    console.log("New Leader: ", data);
});
