function cssVarChange(primary, secondary, tertiary/*, bgimg*/){
	var root = document.documentElement
	root.style.setProperty("--primary", primary)
	root.style.setProperty("--secondary", secondary)
	root.style.setProperty("--tertiary", tertiary)
	//root.style.setProperty("--bgimg", "url('../img/" + bgimg + ".gif')")
	//alert("url('../img/" + bgimg + ".gif')")
}