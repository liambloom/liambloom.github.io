function changeLink(txt, lnk) {
	var together = txt.link("./Countdown.html?" + lnk)
	document.getElementById(txt).innerHTML = together
}