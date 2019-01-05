function inputHandler() {
	function addToPageText(whatToAdd, bullet) {
		if (bullet == undefined) {bullet = stateinfo.bullet}
		$("pageText").innerHTML += /*$("pageText").innerHTML + */bullet + whatToAdd + "<br>";
	}
	var input = $("textbox").value
	var output
	var cheats = {
		unblocked: {
			set enable(setTo) {
				stateinfo.cheatsEnabled = setTo//this does not work if it's false, only true
				if (setTo == true) {//now this doesn't work either :(
					output = "Cheats Enabled"
				}
				else if (setTo == false) {//this does not work
					output = "Cheats Disabled"
				}
				else {
					output = "Error: " + this + "could not be set to" + setTo
				}
			}
		}
	}
	$("textbox").value = stateinfo.textboxDefault
	if (input.includes("/")){
		if (stateinfo.cheatsEnabled || input.includes("/unblocked")) {
			var cheatHandler = input.replace(" ", "").split("=")
			cheatHandler[0] = cheatHandler[0].split(".")
			try{
				cheats[cheatHandler[0][0].replace("/", "")][cheatHandler[0][1]] = cheatHandler[1]//this needs to work even if cheat does not fit that syntax
			}
			catch(err){
				output = "That cheat does not exist<br>\
				Try \"/unblocked.help\""
			}
		}
		/*else if (input == "/Enable Cheats") {
			stateinfo.cheatsEnabled = true
			output = "Cheats Enabled"
		}*/
		else {
			output = "Error: Cheats are not Enabled<br>\
				To enable cheats type &quot;/unblocked.enable = true&quot;"
		}
	}


	//this code stays at the end
	addToPageText(input)
	if (output != undefined){
		if (output.includes("<br>")) {
			//console.log("output includes <br>")
			output = output.replace("<br>", "<br><span class='indent'>")
			output += "</span>"
		}
		//console.log(output)
		addToPageText(output, "< ")
	}
}