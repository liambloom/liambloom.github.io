function changeLink(txt, lnk) {
	//if(typeof(txt.link())!="undefined"){
		var together = txt.link("./Countdown.html?" + lnk)
		document.getElementById(txt).innerHTML = together
		/*document.getElementById("old").innerHTML = ""
	/*	document.getElementById("Labels").innerHTML = ""
	}else{
		document.getElementById("Labels").innerHTML = "The links to premade countdowns could not be generated. Please make your own link or use a different browser. I apologise for any inconveience"
	}
	/*var together = txt.link("./Countdown.html?" + lnk)
	document.getElementById(txt).innerHTML = together*/
}