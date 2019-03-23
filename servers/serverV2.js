//jshint esversion:8
//const http = require("http");//Do I need this?
const express = require("express");
const url = require("url");
const fs = require("fs");
const mime = require("mime-types");

const app = express();
const port = process.env.PORT || 8080;

const href = req => url.parse(req.url, true);
//const query = req => url.parse(req.url, true);
const filetype = req => req.match(/(?<=\.)[^.]+$/)[0];//Does this work
const serve = (req, res, page, onerr, status) => {
	fs.readFile(page, (err, data) => {
		if (err) {
			if (typeof onerr === "function") {
				onerr(req, res, err);
			}
			else {
				err404(req, res);
			}
		}
		else {
			//console.log(filetype(page));
			try {
				res.writeHead(status || 200, {"Content-Type" : mime.contentType(filetype(page))});//Does || do what I think it does?
				res.write(data);
				res.end();
			}
			catch (error) {
				err500(req, res, error);
			}
		}
	});
};
const err404 = (req, res) => {
	serve(req, res, "./404/index.html", (req, res, err) => {
		err500(req, res, err);
	}, 404);
};
const err500 = (req, res, error) => {
	res.writeHead(500, { "Content-Type": "text/html" });
	res.write(`The page ${req.url} could not be found<br>${error}`);
	res.end();
};

//Countdown Picker Server
/*app.get(/\/Countdown\/(index.html)?$/, (req, res) => {
	if (isNaN(req.params.id)) {
		if (href(req).query) {
			res.redirect(`/Countdown/${info.handle(href(req).query)}`);
		}
		else {
			serve(req, res, "./Countdown/index.html");
		}
	}
});

//Countdown Redirect Server
app.get("/Countdown/:event", (req, res) => {
	if (href(req).hash) {
		res.redirect(`/Countdown/${info.pre(req.params.event)}`);
	}
});

app.get("/Countdown/:time/:name/:hourglass", (req, res) => {

});*/

//Index server
app.get(/\/$/, (req, res) => {
	serve(req, res, `.${href(req).pathname}index.html`);
});

//Main server
app.get(/[^]/, (req, res) => {
	serve(req, res, `.${href(req).pathname}`);
});

/*app.route("/css/theme-sugestions.json")
	.get((req, res) => {
		serve(req, res, "../css/theme-sugestions.json");
	})
	.post((req, res) => {
		fs.readFile("../css/theme-sugestions.json", (err, data) => {
			if (err) throw err;
			else {
				let sugestions = JSON.parse(data);
				sugestions.sugestions.push(JSON.parse(url.parse(req.url, true).query));
				fs.writeFile("../css/theme-sugestions.json", JSON.stringify(sugestions), (err) => {
					if (err) {
						res.status(500).send(sugestions);
						throw err;
					}
					else {
						res.status(201).send(sugestions);
					}
				});
				//console.log(url.parse(req.url, true).query);
			}
		});
	})//Do I need a ;
	

app.post("/css/");*/

app.listen(port, () => {console.log(`Server running on port ${port}...`);});