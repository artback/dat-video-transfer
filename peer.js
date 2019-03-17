const hypercore = require("hypercore");
// lets you to find other hyper* peers
const hyperdiscovery = require("hyperdiscovery");
// lets you to write to memory as if you are writing to a file
const ram = require("random-access-memory");
const fs = require('fs');
const source = fs.createWriteStream('./write.mkv');

// pass in the key that's printed from swarm-write.js
const remote = process.argv[2];
if (!remote) {
    console.log("usage: node swarm-read.js <key from swarm-write.js|other hypercore key>");
    process.exit();
}

// we pass the ram as storage to skip creating (and consequently cleaning up after) lots of folders
const feed = hypercore('./client', remote,{overwrite: true});

let swarm;
feed.on("ready", function() {
    // we need to join the swarm to be able to find other peers
    swarm = hyperdiscovery(feed, {live: true});
    // triggered when a peer connects
    swarm.on("connection", function(peer, type) {
        console.log("Connected");
    })
})

// create a readStream so that we can log all of the data we get from the peers we connect with
// 'start: 0' makes the stream start at the beginning of the log
// 'live: true' keeps the stream open after the last bit of data has been read, yielding more data as it comes in
const stream = feed.createReadStream({start: 0, live: true});
stream.on("data", function(data) {
});

