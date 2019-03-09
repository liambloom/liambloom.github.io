const game = () => {
let width = document.documentElement.clientWidth;
let height = document.documentElement.clientHeight;
if (width >= height) {
	var size = height;
}
else {
	var size = width;
}
const root = document.documentElement;
//console.log(Math.floor(size / 6.7))
root.style.setProperty("--tilesize", Math.floor(size / 6.7).toString() + "px");
root.style.setProperty("--space", Math.floor(size / 134).toString() + "px");
let board = {};
let table = document.createElement("table");
table.id = "Main_Table";
document.body.appendChild(table);
table = document.getElementById(table.id);
for (let y = 0; y < 6; y++) {
	board["row" + y] = {};
	board["row" + y].html = table.insertRow(y);
	for (let x = 0; x < 6; x++) {
		board["row" + y]["col" + x] = {};
		board["row" + y]["col" + x].html = board["row" + y].html.insertCell(x);
		const testimg = document.createElement("img");
		testimg.src = "./img/test.png";
		board["row" + y]["col" + x].html.appendChild(testimg);
	}
}
}