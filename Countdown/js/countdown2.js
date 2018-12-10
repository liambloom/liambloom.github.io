function countdown2(yt, mot, dt, ht,  mt, st, ut, until, message, background) {
	var yfinder = new Date().getFullYear() + 1
	var c = new Date(yt, mot, dt, ht, mt, st, ut).getTime();
	var n = new Date().getTime();
	var t = c - n;
	var d = Math.floor(t / 86400000).toString();
	var h = Math.floor((t % 86400000) / 3600000).toString();
	var m = Math.floor((t % 3600000) / 60000).toString();
	var s = Math.floor((t % 60000) / 1000).toString();
	var u = "." + Math.floor(t % 1000).toString();
	while (u.length < 4) {
		u = u + "0"
	}
	if (t <= 0 && t >= -86400000){
		document.body.style.backgroundImage = background//"url('../img/fireworks2.gif')";
		document.getElementById("t").innerHTML = message
	}else{
		if (d > 0){
			document.getElementById("dn").innerHTML = d
			if (d == 1){
				document.getElementById("dl").innerHTML = "day"
			}else{
				document.getElementById("dl").innerHTML = "days"
			}
		}
		if (h > 0){
			document.getElementById("hn").innerHTML = h
			if (h == 1){
				document.getElementById("hl").innerHTML = "hour"
			}else{
				document.getElementById("hl").innerHTML = "hours"
			}
		}
		if (m > 0){
			document.getElementById("mn").innerHTML = m
			if (m == 1){
				document.getElementById("ml").innerHTML = "minute"
			}else{
				document.getElementById("ml").innerHTML = "minutes"
			}
		}		
		document.getElementById("sn").innerHTML = s
		document.getElementById("un").innerHTML = u
		document.getElementById("sl").innerHTML = "seconds"	
		document.getElementById("to").innerHTML = until //new Date().getFullYear() + 1
		console.log(yfinder, yfinder - 1)
	}
}