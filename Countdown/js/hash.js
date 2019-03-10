//jshint esversion:6
const hash = () => {
	console.log("hash ran");
	if (location.hash) {
		if (links[location.hash]) {
			location.assign("?" + loaction.search.replace(/^\?/, "") + links[location.hash.replace(/^#/, "")]);
		}
	}
};