const http = require('http');

let functionality = require('./functionality');

const hostname = '127.0.0.1';

const server = http.createServer(functionality);

const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});