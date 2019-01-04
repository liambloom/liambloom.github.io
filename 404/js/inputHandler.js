function inputHandler() {
	function addToPageText(whatToAdd) {
		$("pageText").innerHTML = $("pageText").innerHTML + stateinfo.bullet + whatToAdd + "<br>";
	}
	addToPageText($("textbox").value)
	$("textbox").value = stateinfo.textboxDefault
	var output


	//this code stays at the end
	if (output != undefined){
		addToPageText(output)
	}
}