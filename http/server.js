const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
  const source = fs.createReadStream('../angel.mkv');
  source.pipe(response);
}).listen(5000,'localhost');

