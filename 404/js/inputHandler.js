function inputHandler() {
	$("pageText").innerHTML = $("pageText").innerHTML + "> " + $("textbox").value + "<br>";
	$("textbox").value = ""
}