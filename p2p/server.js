const fs = require('fs');
const hypercore = require('hypercore');
const hyperdiscovery = require("hyperdiscovery");
const ram = require("random-access-memory");

const source = fs.createReadStream('../angel.mkv');
const feed = hypercore(ram, {overwrite: true});
let swarm;

feed.on("ready", function() {
  console.log(feed.key.toString("hex"));

  swarm = hyperdiscovery(feed);

  swarm.on("connection", function(peer, type) {
    console.log("Have connection");
  });

});



source.on('data', function(chunk) {
  feed.append(chunk);
});

