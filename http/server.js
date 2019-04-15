const http = require('http');
const fs = require('fs');
http.globalAgent.maxSockets = 1000;
http.createServer(function (request, response) {
  const source = fs.createReadStream('../angel2.mkv');
  source.pipe(response);
}).listen(5000,'localhost');

