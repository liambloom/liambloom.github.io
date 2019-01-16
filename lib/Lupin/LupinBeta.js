//Created by Liam Bloom
//Embed with <script src="https://liambloom.github.io/lupin/lupin.js"></script>
var lubinb = {
	version: "&beta;1.4.1.0.0.1",//version
	alphabet: "abcdefghijklmnopqrstuvwxyz".split(""),
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
			return document.getElementsByName(e);
		},
		create: function(e) {
			return document.createElement(e);
		},
		destroy: function(e) {//thanks to catalin.red for this code
			var elem = lubinb.dom.id(e);
			elem.parentNode.removeChild(elem);
    		return elem;
		},
		add: function(e) {
			//return document.appendChild(e);
			lubinb.dom.id(e).parentNode.removeChild($.dom.id(e))
			return lubinb.dom.id(e)
		}, 
		/*remove: function(e) {
			return document.removeChild(e);
		},*/
		replace: function(e) {//um...
			return document.replaceChild(e);
		},
	},
	key: {
		list: new Array(255),
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
	browser: {//Supports Chrome/Dolphin, Firefox, UC, Opera, IE, Samsung, Edge, ASOP Browser, Yandex, Chromium, Blackberry Browser
		get ua() {
			return window.navigator.userAgent;
		},
		get which() {
			if (/(?=.*Chrome)(?!(.*Chromium|.*OPR|.*SamsungBrowser|.*Edge|.*YaBrowser))/im.test(this.ua)) {//Chrome or Dolphin (Identical user agents)
				return /Chrome/i;
			}	
			else if (/(?=.*Safari)(?=(.*iPhone|.*iPad|.*Mac))(?!(.*Chromium|.*OPR|.*Edge|.*UCBrowser))/im.test(this.ua)) {//Safari !UNTESTED
				return /Safar/i;
			}
			else if (/Firefox/im.test(this.ua)) {//Firefox
				return /Firefox/i;
			}
			else if (/UCBrowser/im.test(this.ua)) {//UC !UNTESTED
				return /UCBrowser/i;
			}
			else if (/Opera|OPR|OPiOS/im.test(this.ua)) {//Opera (Opera is true for old versions of opera, opr for new versions, and opios for ios versions)
				return /Opera/i;
			}
			else if (/((?=.*Trident)(?!.*MSIE))|MSIE/im.test(this.ua)) {//IE !Only tested for IE11
				return /IE/i;
			}
			else if (/SamsungBrowser/im.test(this.ua)) {//Samsung Browser
				return /Samsung Internet/i;
			}
			else if (/Edge/im.test(this.ua)) {//Edge
				return /Edge/i;
			}
			else if (/(?=.*Safari)(?=.*Linux)(?=.*Android)(?!.*Chrome)/im.test(this.ua)) {//Android Browser
				return /AOSPBrowser/i;//AOSP = Android Open Source Project
			}
			else if (/YaBrowser/im.test(this.ua)) {//Yandex
				return /Yandex/i;
			}
			else if (/Chromium/im.test(this.ua)) {//Chromium
				return /Chromium/i;
			}
			/*else if (/(?=.*Safari)(?=.*Chrome)(?=.*Linux)(?=.*Android)/im.test(this.ua)) {//Dolphin
				return /Dolphin/
			}*/
			else if (/BlackBerry|BB/im.test(this.ua)) {//Blackberry Browser
				return /BlackBerry/i
			}
			else {
				return /Other/i;
			}
		},
		get engine() {
			if (/AppleWebKit/im.test(this.ua)) {//Most Browsers
				return /Webkit/i;
			}
			else if (/Gecko/im.test(this.ua) && !/like Gecko/im.test(this.ua)) {//Firefox (if lookbehinds were supported in js I would use /(?<!like) Gecko/im.test(this.ua))
				return /Gecko/i;
			}
			else if (/Trident/im.test(this.ua)) {//IE
				return /Trident/i;
			}
			else if (/Presto/im.test(this.ua)) {//Older versions of Opera
				return /Presto/i;
			}
			else {
				return /Other/i;
			}
		},
		is: function(target) {
			if (this.which.test(target) || this.engine.test(target) || this.os.test(target)) {
				return true;
			}
			else {
				return false;
			}
		},
		supports: function(func) {
			if (typeof(func) !== "undefined") {
				return true;
			}
			else {
				return false;
			}
		},
		get lang() {
			return window.navigator.langthis.uage.split("-");
		},
		get os() {
			if (/Windows/im.test(this.ua)) {//Windows
				return /Windows/i;
			}
			else if (/MacOS/im.test(this.ua)) {//MacOS
				return /MacOS/i;
			}
			else if (/CrOS/im.test(this.ua)) {//ChromeOS
				return /ChromeOS/i;
			}
			else if (/Android/im.test(this.ua)) {//Android
				return /Android/i;
			}
			else if (/iPad|iPhone/im.test(this.ua)) {//iOS
				return /iOS/i;
			}
			else if (/Linux/im.test(this.ua)) {//Linux
				return /Linux/i;
			}
			else if (/X11/im.test(this.ua)) {//UNIX
				return /UNIX/i;
			}
			else {
				return /Other/i;
			}
		}
	},
	random: {
		number: function(min, max) {
			return min + Math.round(Math.random() * (max - min))
		},
		get color() {
			var col = "#"
			for (var i = 0; i < 6; i++) {
				col += this.number(0x0, 0xf).toString(16)
			}
			return col
		},
		get letter() {
			return lubinb.alphabet[this.number(0, 25)]
		}
	},
	date: {
		findDay: function(dayToFind, th, )
	}

};
//some of these are from keycode.info thanks to Wes Bos
//var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
lubinb.key.list[0] = /null|nothing/i;
lubinb.key.list[3] = /break/i;
lubinb.key.list[8] = /backspace/i;
lubinb.key.list[9] = /tab/i;
lubinb.key.list[13] = /enter/i;
lubinb.key.list[16] = /shift/i;
lubinb.key.list[17] = /ctrl|control/i;
lubinb.key.list[18] = /alt/i;
lubinb.key.list[19] = /pause|break/i;
lubinb.key.list[20] = /caps lock/i;
lubinb.key.list[21] = /hangul/i;//Korean
lubinb.key.list[25] = /hanga/i;//Chinese Characters in Korean
lubinb.key.list[27] = /escape|esc/i;
lubinb.key.list[28] = /conversion/i;
lubinb.key.list[29] = /non-conversion/i;
lubinb.key.list[32] = /space| /i;
lubinb.key.list[33] = /page up/i;
lubinb.key.list[34] = /page down/i;
lubinb.key.list[35] = /end/i;
lubinb.key.list[36] = /home/i;
lubinb.key.list[37] = /left arrow/i;
lubinb.key.list[38] = /up arrow/i;
lubinb.key.list[39] = /right arrow/i;
lubinb.key.list[40] = /down arrow/i;
lubinb.key.list[41] = /select/i;
lubinb.key.list[42] = /print|ctrl\+p/i;
lubinb.key.list[43] = /execute/i;
lubinb.key.list[44] = /PrtSc|(Print Screen)/i;
lubinb.key.list[45] = /insert/i;
lubinb.key.list[46] = /delete/i;
lubinb.key.list[47] = /help/i;
lubinb.key.list[58] = /colin|:/i;
lubinb.key.list[60] = /(less than)|</i;
lubinb.key.list[63] = /eszett|ß/i;
lubinb.key.list[95] = /sleep/i;
lubinb.key.list[106] = /multiply|\*/i;
lubinb.key.list[107] = /add|\+/i;
lubinb.key.list[110] = /(decimal point)|\./i;
lubinb.key.list[111] = /divide|\//i;
lubinb.key.list[144] = /num lock/i;
lubinb.key.list[145] = /scroll lock/i;
lubinb.key.list[160] = /\^/i;
lubinb.key.list[161] = /\!/i;
lubinb.key.list[162] = /؛|(arabic semicolin)|(arabic semi-colin)|(arabic ;)/i;
lubinb.key.list[163] = /hash|hashtag|hex|octothorp|octothorpe|octatorp|octatherp|sharp|#/i;
lubinb.key.list[164] = /dollar|(dollar sign)|\lubinb/i;
lubinb.key.list[165] = /ù/i;
lubinb.key.list[166] = /(page back)|(page backward)/i;
lubinb.key.list[167] = /page forward/i;
lubinb.key.list[168] = /refresh|reload/i;
lubinb.key.list[169] = /(closing paren)|AZERTY/i;
lubinb.key.list[170] = /star|asterisk|\*/i;
lubinb.key.list[171] = /~|\+|\*/i;
lubinb.key.list[172] = /home/i;
lubinb.key.list[176] = /next/i;
lubinb.key.list[177] = /previous/i;
lubinb.key.list[178] = /stop/i;
lubinb.key.list[179] = /play|pause/i;
lubinb.key.list[180] = /email|e-mail/i;
lubinb.key.list[187] = /equal sign/i;
lubinb.key.list[188] = /comma/i;
lubinb.key.list[189] = /dash/i;
lubinb.key.list[190] = /period|\./i;
lubinb.key.list[191] = /forward slash|ç/i;
//lubinb.key.list[192] = /(grave accent)|grave|ñ|æ|ö/i;
lubinb.key.list[192] = /backquote|`/i;
lubinb.key.list[193] = /\?|,|\/|°/i;
lubinb.key.list[219] = /(backslash)|(back slash)|\\|(open bracket)|\[/i;//Why are these the same?
lubinb.key.list[220] = /(backslash)|(back slash)|\\|(open bracket)|\[/i;//Why are these the same?
lubinb.key.list[221] = /(close bracket)|\]|å/i;
lubinb.key.list[222] = /(single quote)|'|ø|ä/i;
lubinb.key.list[223] = /`/i;
lubinb.key.list[225] = /altgr/i;
lubinb.key.list[226] = /(< \/git>)|(left (backslash|back slash|\\))/
lubinb.key.list[230] = /GNOME Compose Key/i;
lubinb.key.list[231] = /ç/i;
lubinb.key.list[233] = /XF86Forward/i;
lubinb.key.list[234] = /XF86Back/i;
lubinb.key.list[235] = /non-conversion/i;
lubinb.key.list[240] = /alphanumeric/i;
lubinb.key.list[242] = /hiragana|katakana/i;
lubinb.key.list[243] = /half-width|full-width/i;
lubinb.key.list[244] = /kanji/i;
lubinb.key.list[255] = /toggle touchpad/i;
//For Loops
for (var i = 48; i <= 57; i++) {//numbers
	lubinb.key.list[i] = new RegExp((i - 48).toString(), "i");//Regular
	lubinb.key.list[i+48] = new RegExp("numpad " + (i - 48).toString(), "i");//Numpad
}
for (var i = 65; i <= 90; i++) {//letters
	lubinb.key.list[i] = new RegExp(lubinb.alphabet[i - 65], "i");
}
for (var i = 112; i <= 135; i++) {//f
	lubinb.key.list[i] = new RegExp("f" + (i - 111).toString(), "i");
}
//Browser if statements
if (lubinb.browser.is("Firefox")){
	lubinb.key.list[59] = /semicolin|semi-colin|;/i;
	lubinb.key.list[61] = /equals|equal|=/i;
	lubinb.key.list[64] = /at|@/i;
	lubinb.key.list[108] = /numpad (period|\.)/
	lubinb.key.list[173] = /subract|minus|-/i;
	lubinb.key.list[181] = /mute|unmute/i;
	lubinb.key.list[182] = /(decrease volume)|(volume down)/i;
	lubinb.key.list[183] = /(increase volume)|(volume up)/i;
}
else {
	lubinb.key.list[59] = /equals|equal|=/i;
	lubinb.key.list[109] = /subtract|minus|-/i;
	lubinb.key.list[173] = /mute|unmute/i;
	lubinb.key.list[174] = /(decrease volume)|(volume down)/i;
	lubinb.key.list[175] = /(increase volume)|(volume up)/i;
	lubinb.key.list[186] = /semi-colin|semicolin|;|ñ/i;
	if (lubinb.browser.is("Chrome")) {
		lubinb.key.list[194] = /numpad (period|\.)/i;
	}
}
if (lubinb.browser.is("Chrome") || lubinb.browser.is("Edge")) {
	lubinb.key.list[251] = /unlock trackpad/i;
}
//OS if statements
if (lubinb.browser.is("Windows")) {
	lubinb.key.list[91] = /left (window|(window key)|(windows key))/i;
	lubinb.key.list[92] = /right (window|(window key)|(windows key))/i;
	lubinb.key.list[93] = /select|menu/i;
}
else if (lubinb.browser.is("MacOS")) {
	lubinb.key.list[91] = /left (⌘|cmnd|command|(cmnd key)|(command key))/i;
	lubinb.key.list[93] = /select|right (⌘|cmnd|command|(cmnd key)|(command key))/i;
}
else if (lubinb.browser.is("ChromeOS")) {
	lubinb.key.list[91] = /search/i;
}
//Other
if (lubinb.browser.is("Firefox") && lubinb.browser.is("MacOS")) {
	lubinb.key.list[224] = /⌘|cmnd|command|(cmnd key)|(command key)/i;
}