//Created by Liam Bloom
//This makes it easier to create navigation bars, automatically adding all the css and html
//Embed with <script src="https://liambloom.github.io/lib/Perego/PeregoBeta.js"></script>
/*
Instructions:
begin with "nav.init"
then add menus with "nav.menu()"
then add options with "nav.option()"
then add hide buttons to menus with "nav.hide()"
then put menus into options of other menus with "nav.bars.parentmenuname.optionname.innerMenu(childmenuname)"
at any point you can edit the css with "nav.newCss("your css here")"
get the version number with "nav.version"
get the link to the logo with "nav.logo"
when you've done everything you wanted, use "nav.end"
*/
var nav = {
	version: "&alpha;4",
	logo: null,//I need to make one
	counter: {
		cssInternal: -1,//One less than the initial value because it will be ++ed
		//cssInternal: -1,
		cssnInternal: 0,
		barInternal: 0,
		get css() {
			this.cssInternal++;
			return this.cssInternal;
		},
		/*get css() {
			this.cssInternal++;
			return this.cssInternal;
		},*/
		get cssn() {
			this.cssnInternal++;
			return this.cssnInternal;
		},
		get bar() {
			this.barInternal++;
			return this.barInternal.toString();
		}
	},
	validate: {
		get init() {
			if (typeof nav.bars === "object") {
				return true;
			}
			else {
				throw ('Error: to use Perego you must first run the function "nav.init"');
			}
		},
		color: function(input) {
				if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(input)) {
					input = undefined;
					console.warn("Warning: " + input + " is not a valid color");
				} 
				/*else if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)) {
					color = undefined;
				}*/ 
				return input;
		},
		location: function(input) {
			if (!/^(left|right|none|inherit)$/i.test(location)) {
				input = "none";
				console.warn("Warning: " + input + " is not a valid location");
			}
			return input;
		}

	},
	hide: function(html, location) {//innerHTML of button, location of button //DO NOT CALL EXEPT LIKE THIS:"var cssVar = new nav.hidebutton;"
		if (this.validate.init) {
			if (typeof html !== "string") {html = "Hide Menu";}
			//if (typeof location !== "string") {location = "none";} else if (!/^(left|right|none|inherit)$/i.test(location)) {location = "none";}
			this.validate.location(location);
			this.html = html;
			this.location = location;
		}
	},
	menu: function(id, orinetation, level, color, hidebutton) {//id of menu, orinetation of menu, main/sub/subsub, menu color, hide button object
		if (this.validate.init) {
			if (typeof id !== "string") {id = "navBar" + this.counter.bar;}
			if (typeof orinetation !== "string") {orinetation = "horizontal";} else if (!/^(vertical|horizontal)$/i.test(orinetation)) {orinetation = "horizontal";}//See note below
			if (typeof level !== "string") {level = "main";} else if (!/^(main|sub+)$/i.test(level)) {level = "main";}//DO NOT combine if statements with ||, the test statement should not run if level is not a string
			//if (typeof color !== "string") {color = undefined;} else if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)) {color = undefined;}//See note above
			this.validate.color(color);
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
	option: function(link, text, menu, location, color) {//href, innerHTML, what menu it's in, float, color(if different from inherited)
		if (this.validate.init) {
			if (typeof link !== "string") {link = "/";}
			if (typeof text !== "string") {text = "Home";}
			//if (typeof menu !== "string") {menu = Object.keys(this.bars)[0];} else if (!Object.keys(this.bars).includes(menu)) {menu = Object.keys(this.bars)[0];}//DO NOT combine if statements with ||, the test statement should not run if level is not a string
			this.validate.location(location);
			if (typeof location !== "string") {location = "none";} else if (!/^(left|right|none|inherit)$/i.test(location)) {location = "none";}
			//if (typeof color !== "string") {color = undefined} else if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)) {color = undefined}
			this.validate.color(color);
			var main;
			if (menu === Object.keys(this.bars)[0]) {
				main = true;
			}
			else {
				main = false;
			}
			nav.bars[menu].options[text.replace(/\s/gi, "_").replace(/^\d/i, "$").replace(/\W/gi, "$")] = {
				link: link,
				text: text,
				menu: menu,
				location: location,
				color: color,
				innerMenu: function(menu) {//option to put menu in, menu option is in, menu to put in option
					if (this.validate.init) {
						this.text += nav.bars[menu];
						nav.bars[menu] = undefined;
					}
				}
			};
		}
	},
	/*innerMenu: function(option, optionlocation, menu) {//option to put menu in, menu option is in, menu to put in option
		if (this.validate.init) {
			nav.bars[optionlocation].options[option].text += nav.bars[menu]
			nav.bars[menu] = undefined
		}
	},*/
	newCss: function(rule, strict) {//What is the css to add, should you use throw or console.error if there is a problem 
		if (this.validate.init) {
			var node = document.createElement("style");
			node.id = "customcss" + this.counter.cssn;
			node.appendChild(document.createTextNode(""));
			document.head.appendChild(node);
			node = node.sheet;
			if (typeof strict !== "boolean") {strict = false}
			if (typeof rule === "string") {
				node.insertRule(rule, this.counter.css);
			}
			else if (Array.isArray(rule)) {
				for (var i = 0; i < rule.length; i++) {
					node.insertRule(rule[i], this.counter.css);
				}
			}
			else {
				if (strict) {
					throw rule + " is not a valid input";//Using throw will create an unrecoverable error and break the program
				}
				else {
					console.error("Error: " + rule + " is not a valid input")
				}
			}
			this.counter.cssInternal = -1;
			}
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
		this.counter.css = -1;
		delete this.init;//I don't know why I can delete a function and continue running it at the same time, but I can
		return node;//I would put this before the delete statement, but nothing runs after a return statement
	},
	get end() {
		var success = true;//this will be changed to false if something goes wrong
		var error = null;
		success = false;
		error = "This is a test of weather end can fail";
		if (success) {
			nav = undefined;
		}
		else {
			throw error;
		}
		//return node;
	}
};