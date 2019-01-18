//Created by Liam Bloom
//This makes it easier to create navigation bars, automatically adding all the css and html
//Embed with <script src="https://liambloom.github.io/lib/Perego/PeregoBeta.js"></script>
var nav = {
	version: "&alpha;3",
	counter: {
		cssInternal: -1,//One less than the initial value because it will be ++ed
		csscInternal: -1,
		csscnInternal: 0,
		barInternal: 0,//See above note ^
		get css() {
			this.cssInternal++;
			return this.cssInternal;
		},
		get cssc() {
			this.csscInternal++;
			return this.csscInternal;
		},
		get csscn() {
			this.csscnInternal++;
			return this.csscnInternal;
		},
		get bar() {
			this.barInternal++;
			return this.barInternal;
		}
	},
	hidebutton: function(html, location) {//innerHTML of button, location of button //DO NOT CALL EXEPT LIKE THIS:"var cssVar = new nav.hidebutton;"
		if (typeof html !== "string") {html = "Hide Menu";}
		if (typeof location !== "string") {location = "none";} else if (!/^(left|right|none|inherit)$/i.test(location)) {location = "none";}
		this.html = html;
		this.location = location;
	},
	menu: function(id, orinetation, level, color, hidebutton) {//id of menu, orinetation of menu, main/sub/subsub, menu color, hide button object
		if (typeof this.bars === "object") {
			if (typeof id !== "string") {id = "navBar" + this.counter.toString();}
			if (typeof orinetation !== "string") {orinetation = "horizontal";} else if (!/^(vertical|horizontal)$/i.test(orinetation)) {orinetation = "horizontal";}//See note below
			if (typeof level !== "string") {level = "main";} else if (!/^(main|sub+)$/i.test(level)) {level = "main";}//DO NOT combine if statements with ||, the test statement should not run if level is not a string
			if (typeof color !== "string") {color = "#3338";} else if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)) {color = "#3338";}//See note above
			if (typeof hidebutton !== "object") {if (orinetation === "horizontal") {hidebutton = new this.hidebutton(undefined, "right");} else {hidebutton = new this.hidebutton();}}
			nav.bars[id] = {
				id: id,
				orinetation: orinetation,
				level: level,
				color: color,
				hidebutton: hidebutton
			};
		}
		
	},
	option: function(link, text, menu,  hovercolor, location, color) {//href, innerHTML, what menu it's in, color when hovered, float, color(if different from inherited)
		if (typeof this.bars === "object") {
			if (typeof link !== "string") {link = "/";}
			if (typeof text !== "string") {text = "Home";}
			if (typeof menu !== "string") {menu = Object.keys(this.bars)[0];} else if (!Object.keys(this.bars).includes(menu)) {menu = Object.keys(this.bars)[0];}//DO NOT combine if statements with ||, the test statement should not run if level is not a string
			var main;
			if (menu === Object.keys(this.bars)[0]) {
				main = true;
			}
			else {
				main = false;
			}
			nav.bars[menu].options[text.replace(" ", "_")] {//Why is options blue (in sublime text 3)

			}
		}
	},
	innerMenu: function() {
		if (typeof this.bars === "object") {

		}
	},
	newCss: function(rule) {
		var node = document.createElement("style");
		node.id = "customcss" + this.counter.csscn;
		node.appendChild(document.createTextNode(""));
		document.head.appendChild(node);
		node = node.sheet;
		if (typeof rule === "string") {
			node.insertRule(rule, this.counter.cssc);
		}
		else if (Array.isArray(rule)) {
			for (var i = 0; i < rule.length; i++) {
				node.insertRule(rule[i], this.counter.cssc);
			}
		}
		else {
			console.error("Error: " + rule + " is not a valid input");//Using throw will create an unrecoverable error and break the program
		}
		this.counter.csscInternal = -1;
	},
	get init() {
		this.bars = {};
		var node = document.createElement("style");
		node.id = "navBarCss";
		node.appendChild(document.createTextNode(""));
		document.head.appendChild(node);
		node = node.sheet;
		node.insertRule(
			"header#navigationBar {\
				margin-bottom: 10px;\
				padding: 0px;\
				position: fixed;\
				left: 0px;\
				right: 0px;\
				top: 0px;\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul {\
				list-style-type: none;\
				margin: 0;\
				padding: 0;\
				overflow: hidden;\
				background-color: #42362d88\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul.horizontal li {\
				float: left\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul.horizontal li.right {\
				float: right\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul li a {\
				display: block;\
				color: #ffe7d6;\
				padding: 14px 16px;\
				text-decoration: none;\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul li a.main {\
				text-align: center;\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul li a:hover {\
				background-color: #42362d88;\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul li ul {\
				display: none;\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul li a:hover + ul {\
				display: initial;\
			}",
		this.counter.css);
		node.insertRule(
			"header#navigationBar ul li ul:hover {\
				display: initial;\
			}",
		this.counter.css);
		delete this.init;//I don't know why I can delete a function and continue running it at the same time, but I can
		return node;//I would put this before the delete statement, but nothing runs after a return statement
	},
};