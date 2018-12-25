function linkAdd(txt, rpt, lnk) {
	//var together = txt.link(document.getElementById(txt).href + lnk);
	//alert(document.getElementById(txt) + " + " + lnk)
	for(var i=0; i<rpt; i++){
		document.getElementById(txt[i]).href = document.getElementById(txt[i]).href + "?" + lnk//together;
	}
}