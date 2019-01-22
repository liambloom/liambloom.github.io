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
	version: "v1.1.0.0.0.12",
	logo: null,//I need to make one
	counter: {
		cssInternal: -1,//One less than the initial value because it will be ++ed
		//cssInternal: -1,
		cssnInternal: -1,
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
			//for (var i = 0/*, found = false*/; i < Object.keys(nav.bars).length/* && !found*/; i++) {
				/*if (/^main$/i.test(nav.bars[Object.keys(nav.bars)[i]].level)) {
					return Object.keys(nav.bars)[i];
				}
				/*else if (i === Object.keys(this.bars).length/* && !found*//*) {
					//success = false;
					throw "There is no main menu";
				}*/
			/*}
			throw "There is no main menu";
			*/
			if (this.mainInternal) {
				return true
			}
			else {
				mainInternal = true
				return false
			}
			
		},
		mainInternal: false,
		name: function(input) {
			return input.replace(/\s/gi, "_").replace(/^\d/i, "$").replace(/\W/gi, "$")
		},
		color: function(input) {
				if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(input)) {
					console.warn("Warning: " + input + " is not a valid color");
					input = undefined;
				} 
				/*else if (!/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)) {
					color = undefined;
				}*/ 
				return input;
		},
		location: function(input, menu) {
			if (!/^(left|right|none|inherit)$/i.test(input) || menu === "vertical") {
				console.warn("Warning: " + input + " is not a valid location");//This is running when it shouldn't
				input = "none";
			}
			return input;
		},
		orientation: function(input) {
			if (!/^(vertical|horizontal)$/i.test(input)) {
				input = "vertical"
			}
			return input;
		}

	},
	/*hide: function(html, location, color) {//innerHTML of button, location of button //DO NOT CALL EXEPT LIKE THIS:"var cssVar = new nav.hidebutton;"
		if (nav.validate.init) {
			if (typeof html !== "string") {html = "Hide Menu";}
			//if (typeof location !== "string") {location = "none";} else if (!/^(left|right|none|inherit)$/i.test(location)) {location = "none";}
			this.html = html;
			this.location = nav.validate.location(location, nav.bars[nav.validate.main].orientation);//The nav bar needs to be made before the menu. However, it will break if the menu doesn't exist yet
			this.color = nav.validate.color(color);
			//nav.bars.
		}
	},*/
	Menu: function() {//id of menu, orientation of menu, main/sub, menu color, hide button object
		//console.log(this)
		Object.defineProperties(this, {
			id: {
				value: "bar" + nav.counter.bar
			},
			/*orientation: {//This too
				value: nav.validate.orientation(orientation)
			},*/
			optionList: {
				value: {},
				enumerable: true,
				writable: true
			},
			option: {
				set: function(option) {
					//console.log("this ran")
					if (typeof option = "object") {
						if (option.constructor === nav.Option) {
							this.optionList[nav.validate.name(option.text)] = option
						}
						else {
							throw option + " is not an option"
						}
					}
					else {
						throw option + " is not an object"
					}
				}
			}
			options: {
				set: function(options) {
					if (Array.isArray(options)) {
						for (var i = 0; i < options.length; i++) {
							this.option = options[i]
						}
					}
					else {
						throw options + " is not an array"
					}
				}
			}

		});
		if (!nav.validate.main) {
			nav.css = nav.initialCss
			Object.defineProperties(this, {
				orientation: {
					value: "horizontal"
				},
				hide: {
					set: function(button) {
						if (button.constructor === nav.Option){
							button.link = "function() {\
								var elem = document.getElementById('navigationBar');\
								elem.parentNode.removeChild(elem);\
							}";
							this.option = button;
							delete this.hide;
						}
					}
				},
				end: {
					get function() {

					}
				}
			});
		}
		else {
			Object.defineProperty(this, "orientation", {value: "vertical"})
		}
	},
	Option: function(text, link, location, color) {//href, innerHTML, float, color(if different from inherited)
		if (typeof link !== "string") {link = "/";}
		if (typeof text !== "string") {text = "Home";}
		location = nav.validate.location(location);
		Object.defineProperties(this, {
			text: {
				value: text
			},
			link: {
				value: link,
				writable: true
			},
			location: {
				value: location
			},
			color: {
				value: color
			},
			innerMenu: {
				set: function(menu) {
					if (menu.constructor === nav.Menu) {
						delete this.innerMenu;
						this.dropdown = menu;
					}
				},
				configurable: true
			}
		});
	},
	set css(rule) {//What is the css to add 
		var node = document.createElement("style");
		node.id = "navBarCss" + this.counter.cssn;
		node.appendChild(document.createTextNode(""));
		document.head.appendChild(node);
		node = node.sheet;
		if (typeof rule === "string") {
			node.insertRule(rule, this.counter.css);
		}
		else if (Array.isArray(rule)) {
			for (var i = 0; i < rule.length; i++) {
				if (typeof rule[i] === "string") {
					node.insertRule(rule[i], this.counter.css);
				}
				else {
					throw rule[i] + " is not a valid input"
				}
			}
		}
		else {
			throw rule + " is not a valid input";//Using throw will create an unrecoverable error and break the program
		}
		this.counter.cssInternal = -1;
	},
	initialCss: [
		"header#navigationBar {\
			margin-bottom: 10px;\
			padding: 0px;\
			position: fixed;\
			left: 0px;\
			right: 0px;\
			top: 0px;\
		}",
		"header#navigationBar ul {\
			list-style-type: none;\
			margin: 0;\
			padding: 0;\
			overflow: hidden;\
			background-color: #21242b7f\
		}",
		"header#navigationBar ul.horizontal li {\
			float: left\
		}",
		"header#navigationBar ul.horizontal li.right {\
			float: right\
		}",
		"header#navigationBar ul li a {\
			display: block;\
			color: #67d8efff;\
			padding: 14px 16px;\
			text-decoration: none;\
		}",
		"header#navigationBar ul li a.main {\
			text-align: center;\
		}",
		"header#navigationBar ul li a:hover {\
			background-color: #17181c7f;\
		}",
		"header#navigationBar ul li ul {\
			display: none;\
			position: fixed;\
		}",
		"header#navigationBar ul li a:hover + ul {\
			display: initial;\
		}",
		"header#navigationBar ul li ul:hover {\
			display: initial;\
		}"
	],
	get end() {
		/*var success = true;//this will be changed to false if something goes wrong
		var error = null;
		try {*/
		var header = document.createElement("header");
		header.id = "navigationBar";
		//Maybe the webkit hack here, but I'll put it later
		document.body.appendChild(header);
		//var i, found
		var mainMenu = nav.bars[this.validate.main];
		var addMenu = document.createElement("ul");
		addMenu.id = mainMenu.id;
		addMenu.className = "main " + mainMenu.orientation;
		if (mainMenu.color !== undefined) {
			addMenu.style = "background-color:" + mainMenu.color + ";";
		}
		document.getElementById("navigationBar").appendChild(addMenu);
		//mainMenu = document.getElementById(mainMenu.id);
		for (var i = 0; i < Object.keys(nav.bars[this.validate.main].options).length; i++) {
			var optionid = Object.keys(nav.bars[this.validate.main].options)[i];
			var option = nav.bars[this.validate.main].options[optionid];
			var optionShell = document.createElement("li");
			optionShell.id = optionid;
			document.getElementById(mainMenu.id).appendChild(optionShell);
			var innerOption = document.createElement("a");
			innerOption.id = "inner" + optionid;
			innerOption.href = option.link;
			innerOption.className = option.location;
			if (option.color !== undefined) {
				innerOption.style = "background-color:" + option.color + ";";
			}
			document.getElementById(optionid).appendChild(innerOption);
			document.getElementById("inner" + optionid).innerHTML = option.text;
			//console.log(typeof option.innerMenu);//remove after testing
			if (typeof option.innerMenu === "object") {//This code is the same as the code it's in, I should make it a function that calls itself. That would also allow for innermenus in innermenus.
				//console.log("There is an inner menu")//Remove after testing
				var innermenu = document.createElement("ul");
				innermenu.id = optionid + "innermenu";
				document.getElementById(optionid).appendChild(innermenu);
				for (var c = 0; c < Object.keys(option.innerMenu.options).length; c++) {
					var newOptionShell = document.createElement("li");
					newOptionShell.id = Object.keys(option.innerMenu.options)[c];
					document.getElementById(innermenu.id).appendChild(newOptionShell);
					var newInnerOption = document.createElement("a");
					newInnerOption.id = "inner" + Object.keys(option.innerMenu.options)[c];
					newInnerOption.href = option.innerMenu.options[Object.keys(option.innerMenu.options)[c]].link;
					newInnerOption.className = option.innerMenu.options[Object.keys(option.innerMenu.options)[c]].location;
					//No, I refuse to put the code here that would let an option in an innerMenu have a special color because it would be complicate and practically useless
					document.getElementById(Object.keys(option.innerMenu.options)[c]).appendChild(newInnerOption);
					document.getElementById("inner" + Object.keys(option.innerMenu.options)[c]).innerHTML = option.innerMenu.options[Object.keys(option.innerMenu.options)[c]].text;
				}
			}
		}
		if (!/null|undefined/.test(typeof nav.bars[this.validate.main].hidebutton)) {
			var button = document.createElement("li");
			button.id = "hideButton";
			button.className = mainMenu.hidebutton.location;
			//button.onclick = "document.getElementById('navigationBar')."
			document.getElementById(mainMenu.id).appendChild(button);
			button = document.createElement("a");
			button.id = "hideButtonInnards";
			if (mainMenu.hidebutton.color !== undefined) {
				button.style = "color:" + mainMenu.hidebutton.color + ";";
			}
			document.getElementById("hideButton").appendChild(button);
			button = document.getElementById("hideButtonInnards");
			button.innerHTML = mainMenu.hidebutton.html;
			buttonFunction = document.createElement("script");
			buttonFunction.id = "hideButtonOnClick";
			document.head.appendChild(buttonFunction);
			document.getElementById("hideButtonOnClick").innerHTML = "\
				document.getElementById('hideButtonInnards').addEventListener('click', function() {\
					var elem = document.getElementById('navigationBar');\
					elem.parentNode.removeChild(elem);\
				})\
			";
		}
		else {
			console.warn("Warning: Navigation bar has no hide button");
		}
		nav = undefined;
	}
};