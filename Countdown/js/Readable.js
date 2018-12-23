function Readable(theme) {
	switch(theme){
		case '2':
			document.getElementById('cssCode').setAttribute('href', './css/css2.css');
			break;
		case '3':
			document.getElementById('cssCode').setAttribute('href', './css/css3.css');
			break;
		case 'Christmas':
			document.getElementById('cssCode').setAttribute('href', './css/cssC.css');
			break;
		default:
			document.getElementById('cssCode').setAttribute('href', './css/css1.css');
	}
}