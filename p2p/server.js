const fs = require('fs');
const hypercore = require('hypercore');
const hyperdiscovery = require("hyperdiscovery");
const ram = require("random-access-memory");

const source = fs.createReadStream('../angel.mkv');
const feed = hypercore(ram, {overwrite: true});
let swarm;

feed.on("ready", function() {
  fs.writeFile("./key", feed.key.toString("hex"), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }); 

  swarm = hyperdiscovery(feed);

  swarm.on("connection", function(peer, type) {
    console.log("Have connection");
  });

});



source.on('data', function(chunk) {
  feed.append(chunk);
});

