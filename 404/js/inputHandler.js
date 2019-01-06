function inputHandler() {
	function addToPageText(whatToAdd, bullet) {
		if (bullet == undefined) {bullet = ">"}
		$("pageText").innerHTML += bullet + " " + whatToAdd + "<br>";
	}
	function strToBool(str) {
		//console.log("str==" + str)
		if (str == "true") {
			return true
		}
		else if (str == "false") {
			return false
		}
		else {
			return undefined
		}
	}
	var input = $("textbox").value
	var output
	if (input.includes("/")){
		var cheats = {
			u: {
				set enabled(setTo) {
					var v = strToBool(setTo)
					if (v == undefined) {
						v = stateinfo.cheatsEnabled
					}
					stateinfo.cheatsEnabled = v
					//console.log("setTo==" + setTo)
					//console.log("v==" + v)
					if (v) {
						output = "Cheats Enabled"
					}
					else if (!v) {
						output = "Cheats Disabled"
					}
					else {
						output = "Error: " + this + " could not be set to " + v
					}
				},
				help: function initiateHelp() {
					stateinfo.stateChange = "help"
					output = "What would you like help with: cheats or games?"
					//console.log("hi")
					//this.enabled = "true"
				},
				enable_cheats: function chEn() {
					//console.log(this)
					this.enabled = "true"
				},
				disable_cheats: function chDi() {
					this.enabled = "false"
				}
			},
			test: 10,
			ftest: function testFun() {
				//console.log(inputhere)
				output = "ftest ran"
			},
			get theThing() {
				stateinfo.state
			}
		}
		if (stateinfo.cheatsEnabled || input.includes("/u")) {
			//var cheatHandler = input.replace(" ", "").split("=")
			for (var cheatHandler = input.toLowerCase(); cheatHandler.includes(" ");) {
				cheatHandler = cheatHandler.replace(" ", "")
			}
			/*cheatHandler = cheatHandler.split("=")
			cheatHandler[0] = cheatHandler[0].split(".")*/
			try{
				if (cheatHandler.includes("=")){
					cheatHandler = cheatHandler.split("=")
					cheatHandler[0] = cheatHandler[0].split(".")
					switch (cheatHandler[0].length) {
						case 1:
							cheats[cheatHandler[0][0].replace("/", "")] = cheatHandler[1]
							break;
						case 2:
							cheats[cheatHandler[0][0].replace("/", "")][cheatHandler[0][1]] = cheatHandler[1]
							break;
					}
					//console.log("=")
				}
				else if (cheatHandler.includes("/get")) {
					cheatHandler = cheatHandler.split(".")
					switch (cheatHandler.length) {
						case 1:
							output = cheats[cheatHandler[0].replace("/get", "")].toString()
							//console.log(cheats[cheatHandler[0].replace("/get", "")].toString())
							break;
						case 2:
							output = cheats[cheatHandler[0].replace("/get", "")][cheatHandler[1]].toString()
							break;
					}
					//console.log("get")
				}
				else if (cheatHandler.includes("(")) {// untested
					cheatHandler = cheatHandler.split("(")
					//cheatHandler = cheatHandler.split(")")
					cheatHandler[0] = cheatHandler[0].split(".")
					switch (cheatHandler[0].length) {
						case 1:
							cheats[cheatHandler[0][0].replace("/", "")](cheatHandler[1].replace(")", ""))
							break;
						case 2:
							cheats[cheatHandler[0][0].replace("/", "")][cheatHandler[0][1]](cheatHandler[1].replace(")", ""))
							break;
					}
					//console.log("()")
				}
				else {
					cheatHandler = cheatHandler.split(".")
					switch (cheatHandler.length) {
						case 1:
							cheats[cheatHandler[0].replace("/", "")]()
							break;
						case 2:
							//console.log("test1")
							//console.log("handle1:"+cheatHandler[0] + " / handle2: "+cheatHandler[1]);
							cheats[cheatHandler[0].replace("/", "")][cheatHandler[1]]()
							//console.log("test2")
							//cheats["u"]["help_Me_Please"]()
							break;
					}
				}
				
				//cheats[cheatHandler[0][0].replace("/", "")][cheatHandler[0][1]] = cheatHandler[1]//this needs to work even if cheat does not fit the syntax /something.something = something
			}
			catch(err){
				//console.log(cheatHandler[0].replace("/", "") + " " + [cheatHandler[1]])
				output = "That cheat does not exist<br>\
				Try \"/u.help\"<br>" + err 
			}
		}
		/*else if (input == "/Enable Cheats") {
			stateinfo.cheatsEnabled = true
			output = "Cheats Enabled"
		}*/
		else {
			output = "Error: Cheats are not Enabled<br>\
				To enable cheats type &quot;/u.enable_cheats&quot;"
		}
	}


	//this code stays at the end
	$("textbox").value = stateinfo.textboxDefault
	addToPageText(input)
	if (output != undefined){
		/*if (output.includes("<br>")) {
			output = output.replace("<br>", "<br><span class='indent'>")
			output += "</span>"
		}*/
		//for (var i = 0; i <= output.match(/<br>/g).length; i++) {
			output = output.replace(/<br>/g, "<br><span class='indent'>")
			output += "</span>"
		//}
		addToPageText(output, "<")
	}
}