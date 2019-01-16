//Created by Liam Bloom
//This makes it easier to create navigation bars, automatically adding all the css and html
//Embed with <script src="https://liambloom.github.io/lib/Perego/PeregoBeta.js"></script>
var nav = {
	version: "&beta;1.0.0.0.0.0",
	create: function(id, direction, main, color, hidelocation, hidetext) {
		if (typeof id !== "string") {id = "newId"}
		if (typeof direction !== "string") {direction = "horizontal"}
		if (typeof main !== "boolean") {main = false}
		if (typeof color !== "string") {color = "#33333388"}
		if (typeof hidelocation !== "string") {hidelocation = "right"}
		if (typeof hidetext !== "string") {hidextext = "Hide Menu"}
		nav.bars[id] = {

		}
	},
	option: function(link, text, main, hovercolor, location, color) {

	},
	bars: {}
}