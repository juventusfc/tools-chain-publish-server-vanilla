const http = require("http");
const fs = require("fs");

// Create an HTTP server
const server = http.createServer((req, res) => {
  let matched = req.url.match(/filename=([^&]+)/);
  let fileName = matched && matched[1];
  if (!fileName) return;
  let writeStream = fs.createWriteStream("../server/public/" + fileName);
  req.pipe(writeStream);
  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("okay");
  });
});

server.listen(8081);
