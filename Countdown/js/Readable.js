function Readable(theme) {
	switch(theme){
		case '2':
			cssVarChange("#70dfbf", "#8cc4e0", "#3f1fcf")
			break;
		case '3':
			cssVarChange("#3e2b18", "#452d13", "#f4f6f5")
			break;
		case 'Christmas':
			cssVarChange("#28beb4", "#24877e", "#0f524d")
			break;
		default:
			cssVarChange("#EE2277", "#a7145d", "#0d1532")
	}
}