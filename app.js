const http = require('http');
let fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let url = req.url;
  method = req.method
  if (url === '/' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    res.write(`<html>
    <body>
      <form action ='/' method='POST'>
        <input type ="text" name="message">
          <button type="submit">click</button>
        </input>
      </form>
    </body>
  </html>`);
    res.end()
  }
  if (url === '/' && method === "POST") {
    let arr = []
    req.on('data', (chank) => {
      arr.push(chank)
    })
    req.on('end', () => {
      let parsebody = Buffer.concat(arr).toString();
      let mes = parsebody.split('=')[1]
      fs.writeFileSync('message.txt', mes);
      let msg = fs.readFileSync('message.txt', 'utf-8');

      res.statusCode = 300;
      res.setHeader('Content-Type', 'text/html');
      res.write(`<html> <body> <h1>${msg}</h1> 
      <form action ='/' method='POST'>
        <input type ="text" name="message">
          <button type="submit">click</button>
        </input>
      </form></body> </html>`)
      return res.end()
    })
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});