//jshint esversion:6
const http = require("http");
const url = require("url");
const fs = require("fs");

const port = process.env.PORT || 3000;

http.createServer("/", (req, res) => {
	fs.readFile("." + url.parse(req.url, true).pathname, (err, data) => {
		if (err) {
			res.writeHead(404, {"Content-Type": "text/html"});
			res.write("Error: 404");
			res.end();
		}
		else {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(data);
			res.end();
		}
	});
}).listen(port);

console.log(`Server running on port ${port}...`);