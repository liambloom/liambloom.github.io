//v1.1.0 β2.2.2
//Created by Liam Bloom
var $ = {
	dom: {
		id: function(e) {
			return document.getElementById(e);
		},
		class: function(e) {
			return document.getElementsByClassName(e);
		},
		tag: function(e) {
			return document.getElementsByTagName(e);
		},
		name: function(e) {
			return document.getElementsByName(e)
		},
		create: function(e) {
			return document.createElement(e);
		},
		destroy: function(e) {//thanks to catalin.red for this code
			var elem = $.dom.ide(e);
			elem.parentNode.removeChild(elem);
    		return elem;
		},
		add: function(e) {
			return document.appendChild(e);
		}, 
		remove: function(e) {
			return document.removeChild(e);
		},
		replace: function(e) {
			return document.replaceChild(e);
		},
	},
	key: {
		list: new Array(222),
		check: function(key, target) {
			if (this.list.indexOf(target) == key) {
				return true;
			}
			else {
				return false;
			}
		},
		code: function(key) {
			return this.list.indexOf(key);
		}
	},
	browser: {
		get which() {
			//Chrome, Firefox, Safari, Edge, IE, IE11, Opera, UC, Chromium, Samsung Internet, Android Browser
			var ua = window.navigator.userAgent;
			if (/(?=.*Chrome)(?=.*Safari)/i.test(ua)/* && /Safari/i.test(ua)*/) {//Chrome
				return "Chrome"
			}
			else if (/Safari/i.test(ua)) {//Safari !UNTESTED
				return "Safari"
			}
			else if (/Firefox/i.test(ua)) {//Firefox
				return "Firefox"
			}
			else if (ua.indexOf("UCBrowser") > -1 && ua.indexOf("U2") > -1) {//UC !UNTESTED
				return "UCBrowser"
			}
			else if (ua.indexOf("Opera") > -1 || (ua.indexOf("Chrome") > -1 && ua.indexOf("Safari") > -1 && ua.indexOf("OPR") > -1)) {//Opera !UNTESTED
				return "Opera"
			}
			else {
				return undefined
			}
		},
		is: function(target) {
			if (this.which == target) {
				return true
			}
			else {
				return false
			}
		},
		supports: function(func) {
			if (typeof(func) !== "undefined") {
				return true
			}
			else {
				return false
			}
		},
		get lang() {
			return window.navigator.language.split("-")
		}
	}
};
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
$.key.list[8] = "backspace";
$.key.list[9] = "tab";
$.key.list[13] = "enter";
$.key.list[16] = "shift";
$.key.list[17] = "ctrl";
$.key.list[18] = "alt";
$.key.list[19] = "pause/break";
$.key.list[20] = "caps lock";
$.key.list[27] = "escape";
$.key.list[32] = "space";
$.key.list[33] = "page up";
$.key.list[34] = "page down";
$.key.list[35] = "end";
$.key.list[36] = "home";
$.key.list[37] = "left arrow";
$.key.list[38] = "up arrow";
$.key.list[39] = "right arrow";
$.key.list[40] = "down arrow";
$.key.list[45] = "insert";
$.key.list[46] = "delete";
for (var i = 48; i <= 57; i++) {//numbers
	$.key.list[i] = (i - 48).toString();
}
for (var i = 65; i <= 90; i++) {//letters
	$.key.list[i] = alphabet[i - 65];
}
$.key.list[91] = "left window key";
$.key.list[92] = "right window key";
$.key.list[93] = "select key";
for (var i = 96; i <= 105; i++){//numpad
	$.key.list[i] = "numpad " + (i - 96).toString();
}
$.key.list[106] = "multiply";
$.key.list[107] = "add";
$.key.list[109] = "subtract";
$.key.list[110] = "decimal point";
$.key.list[111] = "divide";
for (var i = 112; i <= 123; i++) {//f
	$.key.list[i] = "f" + (i - 112).toString();
}
$.key.list[144] = "num lock";
$.key.list[145] = "scroll lock";
$.key.list[186] = "semi-colin";
$.key.list[187] = "equal sign";
$.key.list[188] = "comma";
$.key.list[189] = "dash";
$.key.list[190] = "period";
$.key.list[191] = "forward slash";
$.key.list[192] = "grave accent";
$.key.list[219] = "back slash";
$.key.list[220] = "open bracket";
$.key.list[221] = "close bracket";
$.key.list[222] = "single quote";