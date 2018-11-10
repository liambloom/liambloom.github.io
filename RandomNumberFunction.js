//variables
	var random

//random number function
	funciton(randomNumber(min, max)){
		do {
			random = Math.round(Math.random() * (max + 1))
		}
		while (random < min)
		return random
	}