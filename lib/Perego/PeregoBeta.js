//Created by Liam Bloom
//This makes it easier to create navigation bars, automatically adding all the css and html
//Embed with <script src="https://liambloom.github.io/lib/Perego/PeregoBeta.js"></script>
//jshint multistr: true
/*
Instructions:
begin with "nav.init"
then add menus with "nav.menu()"
then add options with "nav.option()"
then add hide buttons to menus with "var nav.hide()"
then put menus into options of other menus with "nav.bars.parentmenuname.optionname.innerMenu(childmenuname)"
at any point you can edit the css with "nav.newCss("your css here")"
get the version number with "nav.version"
get the link to the logo with "nav.logo"
when you've done everything you wanted, use "nav.end"
*/
var nav = {
	version: "&beta;1.0.0.0.0.0",
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
		get main() {
			for (var i = 0/*, found = false*/; i < Object.keys(nav.bars).length/* && !found*/; i++) {
				if (/^main$/i.test(nav.bars[Object.keys(nav.bars)[i]].level)) {
					return Object.keys(nav.bars)[i];
				}
				/*else if (i === Object.keys(this.bars).length/* && !found*//*) {
					//success = false;
					throw "There is no main menu";
				}*/
			}
			throw "There is no main menu";
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
		location: function(input, menu) {
			if (!/^(left|right|none|inherit)$/i.test(location) || menu === "vertical") {
				console.warn("Warning: " + input + " is not a valid location");
				input = "none";
			}
			return input;
		}

	},
	hide: function(html, location, color) {//innerHTML of button, location of button //DO NOT CALL EXEPT LIKE THIS:"var cssVar = new nav.hidebutton;"
		if (nav.validate.init) {
			if (typeof html !== "string") {html = "Hide Menu";}
			//if (typeof location !== "string") {location = "none";} else if (!/^(left|right|none|inherit)$/i.test(location)) {location = "none";}
			this.html = html;
			this.location = nav.validate.location(location, nav.bars[nav.validate.main].orinetation);//The nav bar needs to be made before the menu. However, it will break if the menu doesn't exist yet
			this.color = nav.validate.color(color)
			//nav.bars.
		}
	},
	menu: function(id, orinetation, level, color) {//id of menu, orinetation of menu, main/sub, menu color, hide button object
		if (this.validate.init) {
			if (typeof id !== "string") {id = "navBar" + this.counter.bar;}
			if (typeof orinetation !== "string") {orinetation = "horizontal";} else if (!/^(vertical|horizontal)$/i.test(orinetation)) {orinetation = "horizontal";}//See note below
			if (typeof level !== "string") {level = "main";} else if (!/^(main|sub)$/i.test(level)) {level = "main";}//DO NOT combine if statements with ||, the test statement should not run if level is not a string
			if (level === "main") {
				for (var i = 0; i < Object.keys(nav.bars).length; i++) {
					if (nav.bars[Object.keys(nav.bars)[i]].level === "main") {
						level = "sub";
					 	console.warn("Warning: You can not have multiple main menus")
					}
				}
			}
			//if (typeof color !== "string") {color = undefined;} else if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)) {color = undefined;}//See note above
			color = this.validate.color(color);
			if (menu === main) {
				if (typeof hidebutton !== "object" && typeof hidebutton !== null) {if (orinetation === "horizontal") {hidebutton = new this.hidebutton(undefined, "right");} else {hidebutton = new this.hidebutton();}}
			}
			else {
				hidebutton = null
			}
			nav.bars[id] = {
				id: id,
				orinetation: orinetation,
				level: level,
				color: color,
				set hidebutton(button) {
					if (this.level === "main") {
						this.hidebutton = button
					}
					else {
						throw "You can only create a hide button for the main menu"
					}
				} 
			};
		}
	},
	option: function(link, text, menu, location, color) {//href, innerHTML, id of menu it's in, float, color(if different from inherited)
		if (this.validate.init) {
			if (typeof link !== "string") {link = "/";}
			if (typeof text !== "string") {text = "Home";}
			if (typeof menu !== "string") {menu = Object.keys(this.bars)[0];} else if (!Object.keys(this.bars).includes(menu)) {menu = Object.keys(this.bars)[0];}//DO NOT combine if statements with ||, the test statement should not run if level is not a string
			location = this.validate.location(location, menu.orinetation);
			//if (nav.bars[menu].level = "main")
			if (/*typeof location !== "string") {location = undefined;} else if (*/!/^(left|right|none|inherit)$/i.test(location)) {location = undefined;}
			//if (typeof color !== "string") {color = undefined} else if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)) {color = undefined}
			color = this.validate.color(color);
			var main;
			if (menu === /*Object.keys(this.bars)[0]*/nav.validate.main) {
				main = true;
			}
			else {
				main = false;
			}
			nav.bars[menu].options[text.replace(/\s/gi, "_").replace(/^\d/i, "$").replace(/\W/gi, "$")] = {
				link: link,
				text: text,
				//menu: menu,
				location: location,
				color: color,
				set innerMenu(menu) {
					this.innerMenu = nav.bars[menu];
					nav.bars[menu] = undefined
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
			if (typeof strict !== "boolean") {strict = false;}
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
					console.error("Error: " + rule + " is not a valid input");
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
		this.counter.css);//Shoud I have just created some css with an href and made the css in a different file
		this.counter.css = -1;
		delete this.init;//I don't know why I can delete a function and continue running it at the same time, but I can
		return node;//I would put this before the delete statement, but nothing runs after a return statement
	},
	get end() {
		/*var success = true;//this will be changed to false if something goes wrong
		var error = null;
		try {*/
		var header = document.createElement("header");
		header.id = "navigationBar";
		//Maybe the webkit hack here, but I'll put it later
		document.body.appendChild(header);
		//var i, found
		var mainMenu = this.validate.main;
		var addMenu = document.createElement("ul");
		addMenu.id = mainMenu.id;
		addMenu.class = "main " + mainMenu.orinetation;
		if (mainMenu.color !== undefined) {
			addMenu.style = "background-color:" + mainMenu.color + ";";
		}
		document.getElementById("navigationBar").appendChild(addMenu);
		mainMenu = document.getElementById(mainMenu.id);
		if (mainMenu.hidebutton !== null) {
			var button = document.createElement("li");
			button.id = "hideButton";
			button.class = mainMenu.hidebutton.location;
			//button.onclick = "document.getElementById('navigationBar')."
			document.getElementById("mainMenu").appendChild(button);
			button = document.createElement("a");
			button.id = "hideButtonInnards"
			if (mainMenu.hidebutton.color !== undefined) {
				button.style = "color:" + mainMenu.hidebutton.color + ";";
			}
			document.getElementById("hideButton").appendChild(button);
			button = document.getElementById("hideButtonInnards");
			button.innerHTML = mainMenu.hidebutton.html;
			buttonFunction = document.createElement("script");
			buttonFunction.createTextNode("\
				document.getElementById('hideButtonInnards').addEventListener('click', function() {\
					var elem = document.getElementById('navigationBar');\
					elem.parentNode.removeChild(elem);\
				})\
			");
			document.head.appendChild(buttonFunction);
		}
		else {
			console.warn("Warning: Navigation bar has no hide button")
		}
		for (var i = 0; i < Object.keys(this.validate.main.options).length; i++) {
			var optionid = Object.keys(nav.bars[this.validate.main].options)[i];
			var option = nav.bars[this.validate.main].options[optionid];
			var optionShell = document.createElement("li");
			optionShell.id = optionid;
			document.getElementById("navigationBar").appendChild(optionShell);
			var innerOption = document.createElement("a");
			innerOption.id = "inner" + optionid;
			innerOption.href = option.link;
			innerOption.class = option.location;
			if (option.color !== undefined) {
				innerOption.style = "background-color:" + option.color + ";";
			}
			document.getElementById(optionid).appendChild(innerOption);
			document.getElementById("inner" + optionid).innerHTML = option.text;
			if (typeof option.innerMenu === "object") {//This code is the same as the code it's in, I should make it a function that calls itself. That would also allow for innermenus in innermenus.
				var innermenu = document.createElement("ul");
				innermenu.id = optionid + "innermenu";
				document.getElementById(optionid).appendChild(innermenu);
				for (var c = 0; c < Object.keys(option.innerMenu.options).length, c++) {
					var newOptionShell = document.createElement("li");
					newOptionShell.id = Object.keys(option.innerMenu.options)[c];
					document.getElementById(optionid).appendChild(newOptionShell);
					var newInnerOption = document.createElement("a");
					newInnerOption.id = "inner" + Object.keys(option.innerMenu.options)[c];
					newInnerOption.href = option.innerMenu.options[Object.keys(option.innerMenu.options)[c]].link
					newInnerOption.chass = option.innerMenu.options[Object.keys(option.innerMenu.options)[c]].location
					//No, I refuse to put the code here that would let an option in an innerMenu have a special color because it would be complicate and practically useless
					document.getElementById(Object.keys(option.innerMenu.options)[c]).appendChild(newInnerOption);
					document.getElementById("inner" + Object.keys(option.innerMenu.options)[c]).innerHTML = option.innerMenu.options[Object.keys(option.innerMenu.options)[c]].text;
				}
			}
		}
		nav = undefined;
	}
};
//There must be something wrong with "doucument.getElementById("inner" + Object.keys(nav.bars[Object.keys(nav.bars[n])].options[Object.keys(nav.bars[Object.keys(nav.bars[n])].options)[i]])[c]).innerHTML = nav.bars[Object.keys(nav.bars[n])].options[Object.keys(nav.bars[Object.keys(nav.bars[n])].options)[i]].innerMenu.options[Object.keys(nav.bars[Object.keys(nav.bars[n])].options[Object.keys(nav.bars[Object.keys(nav.bars[n])].options)[i]].innerMenu.options)[c]].text"