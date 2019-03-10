//jshint esversion:6
const countdown3 = (c = new Date(1970, 0, 1, 0, 0, 0, 0).getTime(), until = "Something Happens", message = "Something Happened", background = 'url("./img/fireworks.gif")') => {
	//var c = new Date(yt, mot, dt, ht, mt, st, ut).getTime();
	var n = new Date().getTime();
	var t = c - n;
	var d = Math.floor(t / 86400000).toString();
	var h = Math.floor((t % 86400000) / 3600000).toString();
	var m = Math.floor((t % 3600000) / 60000).toString();
	var s = Math.floor((t % 60000) / 1000).toString();
	var u = "." + Math.floor(t % 1000).toString();
	while (u.length < 4) {
		u = u + "0";
	}
	if (t <= 0) {
		document.body.style.backgroundImage = background;
		document.getElementById("t").innerHTML = message;
		if (document.body.style.backgroundImage == background) {
			Readable();
		}
		clearInterval(count);
	} else {
		set(dn, d, () => {
			if (d > 0) {
				document.getElementById("dn").innerHTML = d;
				document.getElementById("dl").innerHTML = "day";
				if (d > 1) {
					document.getElementById("dl").innerHTML += "s";
				}
			} else {
				document.getElementById("dn").innerHTML = "";
				document.getElementById("dl").innerHTML = "";
			}
		});
		set(hn, h, () => {
			if (h > 0) {
				document.getElementById("hn").innerHTML = h;
				document.getElementById("hl").innerHTML = "hour";
				if (h > 1) {
					document.getElementById("hl").innerHTML += "s";
				}
			} else {
				document.getElementById("hn").innerHTML = "";
				document.getElementById("hl").innerHTML = "";
			}
		});
		set(mn, m, () => {
			if (m > 0) {
				document.getElementById("mn").innerHTML = m;
				document.getElementById("ml").innerHTML = "minute";
				if (m > 1) {
					document.getElementById("ml").innerHTML = "s";
				}
			} else {
				document.getElementById("mn").innerHTML = "";
				document.getElementById("ml").innerHTML = "";
			}
		});
		set(sn, s, () => {document.getElementById("sn").innerHTML = s;});
		set(sl, "seconds", () => {
			document.getElementById("sl").innerHTML = "seconds";
			document.getElementById("to").innerHTML = until;
		});
	}
};