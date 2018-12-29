function links() {
	document.getElementById("NewYearsDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 0) + "-01-01&4=" + findYear(n.getFullYear(), n.getMonth(), 0) + "&5=Happy+New+Year";
	document.getElementById("MartinLutherKingJrDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 0) + "-01-" + findDay(findYear(n.getFullYear(), n.getMonth(), 0), 0, 1, 3) + "&4=Martin+Luther+King+Jr.+Day&5=Happy+Martin+Luther+King+Jr.+Day";
	document.getElementById("GeorgeWashingtonsBirthday").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 1) + "-02-" + findDay(findYear(n.getFullYear(), n.getMonth(),  1), 1, 1, 3) + "&4=Presidents'+Day&5=Happy+Presidents'+Day";
	document.getElementById("MemorialDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 4) + "-05-" + findLast(findYear(n.getFullYear(), n.getMonth(), 4), 4, 1) + "&4=Memorial+Day&5=Never+Forget&6=flag";
	document.getElementById("IndependenceDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 6) + "-07-04&4=Independence+Day&5=Happy+Independence+Day";
	document.getElementById("LaborDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 8) + "-09-" + findDay(findYear(n.getFullYear(), n.getMonth(), 8), 8, 1, 1) + "&4=Labor+Day&5=Happy+Labor+Day";
	document.getElementById("ColumbusDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 9) + "-10-" + findDay(findYear(n.getFullYear(), n.getMonth(), 9), 9, 1, 2) + "&4=Columbus+Day&5=Happy+Columbus+Day&6=ship";
	document.getElementById("VeteransDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 10) + "-11-11&4=Veterans+Day&5=Never+Forget&6=flag";
	document.getElementById("ThanksgivingDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 10) + "-11-" + findDay(findYear(n.getFullYear(), n.getMonth, 10), 10, 4, 4) + "&4=Thanksgiving&5=Happy+Thanksgiving&6=turkey";
	document.getElementById("ChristmasDay").href = "?0=" + findYear(n.getFullYear(), n.getMonth(), 11) + "-12-25&4=Christmas&5=Merry+Christmas&6=christmasTree";
	document.getElementById("Test").href = "?0=" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "&1=" + n.getHours() + ":" + n.getMinutes() + "&2=" + (n.getSeconds() + 15) + "&4=Results&5=Now";
}