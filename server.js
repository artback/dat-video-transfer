const fs = require('fs');
const hypercore = require('hypercore');
const hyperdiscovery = require("hyperdiscovery");


const source = fs.createReadStream('./angel.mkv');
const feed = hypercore('./feed',
    {overwrite: true});
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

