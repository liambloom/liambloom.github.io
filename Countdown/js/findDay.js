function findDay(year, month, daytofind, th) {
	var finder = new Date(year, month, 1, 0, 0, 0, 0)
	var i = 0
	while (i<th) {
		if (finder.getDay() == daytofind) {
			i++
			//console.log(finder.getDay())
		}
		finder.setDate(finder.getDate() + 1)
	}
	//console.log(finder.getDate() - 1)
	return (finder.getDate() - 1)
}