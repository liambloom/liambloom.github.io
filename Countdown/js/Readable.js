function Readable() {
	switch(document.body.style.backgroundImage){
		/*case 'url("./img/Hourglass.gif")':
			document.getElementById('cssCode').setAttribute('href', './css/css1.css');
			break;*/
		case 'url("./img/Hourglass2.gif")':
			document.getElementById('cssCode').setAttribute('href', './css/css2.css');
			break;
		case 'url("./img/Hourglass3.gif")':
			document.getElementById('cssCode').setAttribute('href', './css/css3.css');
			break;
		case 'url("./img/HourglassChristmas.gif")':
			document.getElementById('cssCode').setAttribute('href', './css/cssC.css');
			break;
		default:
			document.getElementById('cssCode').setAttribute('href', './css/css1.css');
	}
}