function Readable(theme) {
	//let root = document.documentElement
	switch(theme){
		case '2':
			//document.getElementById('cssCode').setAttribute('href', './css/css2.css');
			//root.style.setProperty("--primary", "#70dfbf")
			cssVarChange("#70dfbf", "#8cc4e0", "#3f1fcf")
			break;
		case '3':
			//document.getElementById('cssCode').setAttribute('href', './css/css3.css');
			cssVarChange("#3e2b18", "#452d13", "#f4f6f5")
			break;
		case 'Christmas':
			//document.getElementById('cssCode').setAttribute('href', './css/cssC.css');
			cssVarChange("#28beb4", "#24877e", "#0f524d")
			break;
		default:
			//document.getElementById('cssCode').setAttribute('href', './css/css1.css');
			cssVarChange("#EE2277", "#a7145d", "#0d1532")
	}
	//alert("Readable Ran")
}