function countdownHandler(dtf, ttf, st, ut, until, message, background) {
	var dtp = dtf.split("-");
	var ttp = ttf.split(":");
	//alert(Number(dtp[0]).toString() + Number(dtp[1]).toString() + Number(dtp[2]).toString() + Number(ttp[0]).toString() +  Number(ttp[1]).toString() + st.toString() + ut.toString() + until.toString() + message.toString() + background.toString())
	countdown2(Number(dtp[0]), Number(dtp[1]) - 1, Number(dtp[2]), Number(ttp[0]),  Number(ttp[1]), st, ut, until, message, background);
}