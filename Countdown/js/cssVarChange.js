function cssVarChange(primary, secondary, tertiary/*, bgimg*/){
	var root = document.documentElement;
	root.style.setProperty("--primary", primary);
	root.style.setProperty("--secondary", secondary);
	root.style.setProperty("--tertiary", tertiary);
}