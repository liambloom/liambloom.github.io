//jshint esversion:6

const init = () => {
	hash();
	//window.onhashchange = hash();
	if (location.search == "") {
		destroy("main");
	}
	else {
		destroy("menu");
		const entries = new URLSearchParams(location.search).entries();
		//info = {};
		for (let pair of entries) {
			if (pair[1].toString() !== "") {
				info[pair[0]] = pair[1];
			}
		}
		try {
			info.endbg = `url("./img${info.endbg}.gif")`;
		}
		catch (err) {}
		const count = setInterval(() => {
			countdownHandler(info);
		}, 1);
		document.body.style.backgroundImage = `url("./img/${info.hgbg}.gif")`;
		//window.onload = readable();
		if (info.hgbg != undefined && info.hgbg != "") {
			destroy("hourglassMenu");
		}
	}
	window.onload = () => {
		if (readable()) {
			destroy("hourglassMenu");		
		}
	};
	try {
		//var linkslist = ["NewYearsDay", "MartinLutherKingJrDay", "GeorgeWashingtonsBirthday", "MemorialDay", "IndependenceDay", "LaborDay", "ColumbusDay", "VeteransDay", "ThanksgivingDay", "ChristmasDay", "Test"];
		document.getElementById("hourglassSubmit").onclick = () => {
			if (document.getElementById('hourglassSave')) {
				document.getElementById('hourglassSave').value = document.getElementById("hourglassselect").value;
				linkAdd(links, "?hgbg=" + document.getElementById("hourglassselect").value);
			}
			else {
				location.assign(location.search + "&hgbg=" + document.getElementById("hourglassselect").value);
			}
			destroy('hourglassMenu');
		};
	} 
	catch (err) {}
	try {
		window.addEventListener('load', () => {
			if (!(CSS.supports('color', 'var(--fake-var)'))) {
				Redirect("Error: CSS variables are not supported");
			}
		}, false);
	}
	catch (err) {
		Redirect("Error: CSS variables are not supported");
	}
};