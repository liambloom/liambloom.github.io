function links(link) {
	switch(link){
		case 0:
			document.getElementById("NewYearsDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 0) + "-01-01&4=" + findYear(n.getFullYear(), n.getMonth(), 0) + "&5=Happy+New+Year";
			break;
		case 1:
			document.getElementById("MartinLutherKingJrDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 0) + "-01-" + findDay(findYear(n.getFullYear(), n.getMonth(), 0), 0, 1, 3) + "&4=Martin+Luther+King+Jr.+Day&5=Happy+Martin+Luther+King+Jr.+Day";
			break;
		case 2:
			document.getElementById("GeorgeWashingtonsBirthday").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 1) + "-02-" + findDay(findYear(n.getFullYear(), n.getMonth(),  1), 1, 1, 3) + "&4=Presidents'+Day&5=Happy+Presidents'+Day";
			break;
		case 3:
			document.getElementById("MemorialDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 4) + "-05-" + findLast(findYear(n.getFullYear(), n.getMonth(), 4), 4, 1) + "&4=Memorial+Day&5=Never+Forget&6=flag";
			break;
		case 4:
			document.getElementById("IndependenceDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 6) + "-07-04&4=Independence+Day&5=Happy+Independence+Day";
			break;
		case 5:
			document.getElementById("LaborDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 8) + "-09-" + findDay(findYear(n.getFullYear(), n.getMonth(), 8), 8, 1, 1) + "&4=Labor+Day&5=Happy+Labor+Day";
			break;
		case 6:
			document.getElementById("ColumbusDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 9) + "-10-" + findDay(findYear(n.getFullYear(), n.getMonth(), 9), 9, 1, 2) + "&4=Columbus+Day&5=Happy+Columbus+Day&6=ship";
			break;
		case 7:
			document.getElementById("VeteransDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 10) + "-11-11&4=Veterans+Day&5=Never+Forget&6=flag";
			break;
		case 8:
			document.getElementById("ThanksgivingDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 10) + "-11-" + findDay(findYear(n.getFullYear(), n.getMonth, 10), 10, 4, 4) + "&4=Thanksgiving&5=Happy+Thanksgiving&6=turkey";
			break;
		case 9:
			document.getElementById("ChristmasDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 11) + "-12-25&4=Christmas&5=Merry+Christmas&6=christmasTree";
			break;
		case 10:
			document.getElementById("Test").href = "?0=" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "&1=" + n.getHours() + ":" + n.getMinutes() + "&2=" + (n.getSeconds() + 15) + "&4=Results&5=Now";
			break;
		case "all":
			for (var i = 0; i <= 10; i++) {
				links(i)
			}
	}
}