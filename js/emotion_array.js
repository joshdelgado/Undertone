	var e1 = "trust";
	var e2 = "anger";
	var e3;
	var emotionCombo = [
	["null","trust","fear","surprise","sadness","disgust","anger","anticipation","joy"],
	["trust","trust","submission","curiosity","sentimentality","conflict","dominance","fatalism","love"],
	["fear","submission","fear","alarm","despair","shame","conflict","anxiety","guilt"],
	["surprise","curiosity","despair","surprise","disappointment","?","outrage","conflict","delight"],
	["sadness","sentimentality","alarm","disappointment","sadness","remorse","envy","pessimism","conflict"],
	["disgust","conflict","shame","?","remorse","disgust","contempt","cynicism","morbidness"],
	["anger","dominance","conflict","outrage","envy","contempt","anger","aggression","pride"],
	["anticipation","fatalism","anxiety","conflict","pessimism","cynicism","aggression","anticipation","optimism"],
	["joy","love","guilt","delight","conflict","morbidness","pride","optimism","joy"]
	];

	function emotionToNum(emotion){
		var num;
		if(emotion=="trust"){
			num=1;
		} else if(emotion=="fear"){
			num=2;
		} else if(emotion=="surprise"){
			num=3;
		} else if(emotion=="sadness"){
			num=4;
		} else if(emotion=="disgust"){
			num=5;
		} else if(emotion=="anger"){
			num=6;
		} else if(emotion=="anticipation"){
			num=7;
		} else if(emotion=="joy"){
			num=8;
		}
		return num;
	}

	function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var emoNum1 = emotionToNum(e1);
	var emoNum2 = emotionToNum(e2);
	var emoNum1r = getRandomInt(1,8);
	var emoNum2r = getRandomInt(1,8);

//	console.log(e1+" "+emoNum1);
//	console.log(e2+" "+emoNum2);
//	console.log(emotionCombo[emoNum1][emoNum2]);

	console.log("Random");
	console.log(e1+" "+emoNum1r);
	console.log(e2+" "+emoNum2r);
	console.log(emotionCombo[emoNum1r][emoNum2r]);



