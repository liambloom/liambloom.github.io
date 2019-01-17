//Created by Liam Bloom
//This makes it easier to create navigation bars, automatically adding all the css and html
//Embed with <script src="https://liambloom.github.io/lib/Perego/PeregoBeta.js"></script>
var nav = {
	version: "&alpha;2",
	counter: {
		cssInternal: -1,//One less than the initial value because it will be ++ed
		barInternal: 0,//See above note ^
		get css() {
			this.cssInternal++;
			return this.cssInternal;
		},
		get bar() {
			this.barInternal++;
			return this.barInternal;
		}
	},
	create: function(id, direction, main, color, hidelocation, hidetext) {
		if (typeof id !== "string") {id = "navBar" + this.counter.toString();}
		if (typeof direction !== "string") {direction = "horizontal";}
		if (typeof main !== "boolean") {main = false;}
		if (typeof color !== "string") {color = "#33333388";}
		if (typeof hidelocation !== "string") {hidelocation = "right";}
		if (typeof hidetext !== "string") {hidetext = "Hide Menu";}
		nav.bars[id] = {
			id: id,
			direction: direction,
			main: main,
			color: color,
			hidelocation: hidelocation,
			hidetext: hidetext
		};
		
	},
	option: function(link, text, main, menu, hovercolor, location, color) {
		
	},
	innerMenu: function() {

	},
	get init() {
		this.bars = {};
		var node = document.createElement("style");
		node.id = "navBarCss";
		node.appendChild(document.createTextNode(""));
		document.head.appendChild(node);
		node = node.sheet;
		node.insertRule(
			"header#nav {\
				margin-bottom: 10px;\
				padding: 0px;\
				position: fixed;\
				left: 0px;\
				right: 0px;\
				top: 0px;\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul {\
				list-style-type: none;\
				margin: 0;\
				padding: 0;\
				overflow: hidden;\
				background-color: #5b4b3e88\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul.horizontal li {\
				float: left\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul.horizontal li.right {\
				float: right\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul li a {\
				display: block;\
				color: #ffe7d6;\
				padding: 14px 16px;\
				text-decoration: none;\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul li a.main {\
				text-align: center;\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul li a:hover {\
				background-color: #42362d88;\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul li ul {\
				display: none;\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul li a:hover + ul {\
				display: initial;\
			}",
		this.counter.css);
		node.insertRule(
			"header#nav ul li ul:hover {\
				display: initial;\
			}",
		this.counter.css);
		delete this.init;//I don't know why I can delete a function and continue running it at the same time, but I can
		return node;//I would put this before the delete statement, but nothing runs after a return statement
	},
};