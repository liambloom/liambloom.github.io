var player = {
	hp: 20,
	cordinates: {
		x: 0,
		y: 0,
		z: 0,
		get full() {
			return "_" + this.x + "_" + this.y + "_" + this.z
		}
	},
	inventory: {}
}
var locations = {
	_0_0_0: "Hello<br>> I am liam"
}