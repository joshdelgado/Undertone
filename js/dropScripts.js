$(function(){
	var counter=0;
	$('#stuffhere').hide();
	$("#colorPalette").hide();
	$('#capture').hide();
	$("#hideMe").hide();
	var dropbox = $('#dropbox'),
	message = $('.message', dropbox),
	mainBody = $('#lifeForce'),
	sourceImage;

	var dragTimer;
	$(document).on('dragover', function(e) {
	    var dt = e.originalEvent.dataTransfer;
	    if(dt.types != null && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('application/x-moz-file'))) {
	        $('.imgOption').fadeOut(200, function(){
	        	$('.imgOptionWide').fadeIn(200);
	        });
	        window.clearTimeout(dragTimer);
	    }
	});
	$(document).on('dragleave', function(e) {
	    dragTimer = window.setTimeout(function() {
	        $('.imgOptionWide').fadeOut(200, function(){
	        	$('.imgOption').fadeIn(200);
	        });
	    }, 100);
	});

	$('.imgOptionWide').on('dragover', function(){
		$(this).children('p').html('drop photo');
	});
	$('.imgOptionWide').on('dragleave', function(){
		$(this).children('p').html('drag image here');
	});

	$('.upload-image').on('click', function() {
		$('#click-image-upload').click();
	});
	$('#click-image-upload').change(function(files){
		$('.loader').fadeIn().delay(1000);
	    var file = this.files[0];
	    createImage(file);
	    $('#stuffhere').show();
	    $('#colorPalette').show();
	});

	dropbox.filedrop({
		// The name of the $_FILES entry:
		paramname:'pic',
		
		maxfiles: 5,
		maxfilesize: 3,
		url: 'php/post_file.php',

		drop:function(){
			$('.loader').fadeIn().delay(1000);
		},
		
		uploadFinished:function(i,file,response){
			$.data(file).addClass('done');
			// response is the JSON omject that post_file.php returns
		},
		
		error: function(err, file) {
			switch(err) {
				case 'BrowserNotSupported':
				showMessage('Your browser does not support HTML5 file uploads!');
				break;
				case 'TooManyFiles':
				alert('Too many files! Please select 5 at most!');
				break;
				case 'FileTooLarge':
				alert(file.name+' is too large! Please upload files smaller than 3mb.');
				break;
				default:
				break;
			}
		},
		
		// Called before each upload is started
		beforeEach: function(file){
			if(!file.type.match(/^image\//)){
				alert('Only images are allowed!');
				
				// Returning false will cause the
				// file to be rejected
				return false;
			}
		},
		
		uploadStarted:function(i, file, len){
			createImage(file);
			//$("header").hide();
			//$("#mainBody").hide();
			$("#hideMe").show();
			$('#stuffhere').show();
			$('#colorPalette').show();
		},
		
		//progressUpdated: function(i, file, progress) {
		//	$.data(file).find('.progress').width(progress);
		//}

	});

var template = '<div class="preview">'+
'<h2>Your Image</h2>'+
'<span class="imageHolder">'+
'<img class="uploadedImg" />'+
'</span>'+
'</div>'; 

function createImage(file){

	var preview = $(template), 
	image = $('img', preview);

	var reader = new FileReader();

	image.width = 100;
	image.height = 100;

	reader.onload = function(e){
			// e.target.result holds the DataURL which can be used as a source of the image:
			if(counter == 1){
				image.attr('src',e.target.result);
			//alert("init image set");
			counter++;
		}
		else if(counter > 1){
			//alert("new image replace old");
			$(".uploadedImg").attr('src',e.target.result);
		}
		var myImage = new Image();
		myImage.onload = function() {
			var colorThief = new ColorThief();
			paletteArray = colorThief.getPalette(myImage, 5);
			colorToMood();
		  //alert(paletteArray[0]); //IT FREAKING WORKS, HERE IS THE COLOR BITCHES
		}
		myImage.src = e.target.result;
	};

		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		// message.hide(); THIS hides the text inside the drop area.

		if(counter == 0){
			preview.appendTo(mainBody);
			counter++;
			//alert("counter increase");
		}
		
		
		// Associating a preview container
		// with the file, using jQuery's $.data():
		
		$.data(file,preview);

	};
	function showMessage(msg){
		message.html(msg);
	}

	$(window).scroll(function() {
		var windowHeight = $(window).scrollTop();
		if(windowHeight  > 100) {
			$("#hideMe").fadeIn();
		}
		if(windowHeight  < 100) {
			$("#hideMe").hide();
		}
	});
	//$(document).ready(function(){
	    //$('#capture').hide();
	    function colorToMood(){

	    	if(paletteArray != null){
	    		firstcolorR = paletteArray[0][0];
	    		firstcolorG = paletteArray[0][1];
	    		firstcolorB = paletteArray[0][2];

	    		secondcolorR = paletteArray[1][0];
	    		secondcolorG = paletteArray[1][1];
	    		secondcolorB = paletteArray[1][2];

	    		thirdcolorR = paletteArray[2][0];
	    		thirdcolorG = paletteArray[2][1];
	    		thirdcolorB = paletteArray[2][2];

	    		fourthcolorR = paletteArray[3][0];
	    		fourthcolorG = paletteArray[3][1];
	    		fourthcolorB = paletteArray[3][2];

	    		fifthcolorR = paletteArray[4][0];
	    		fifthcolorG = paletteArray[4][1];
	    		fifthcolorB = paletteArray[4][2];
	    	}
	        /*for(i=0; i<paletteArray.length; i++){
	           var ? = paletteArray[i]
	       }*/

	        //console.log(firstcolorR + " " + firstcolorG + " " + firstcolorB + " YES SEXY ");

	        /*==================================Creates an array of all web safe colors & prints them=======================================*/
	/*var allWebsafeColors = "000000 000033 000066 000099 0000CC 0000FF 003300 003333 003366 003399 0033CC 0033FF 006600 006633 006666 006699 0066CC 0066FF 009900 009933 009966 009999 0099CC 0099FF 00CC00 00CC33 00CC66 00CC99 00CCCC 00CCFF 00FF00 00FF33 00FF66 00FF99 00FFCC 00FFFF 330000 330033 330066 330099 3300CC 3300FF 333300 333333 333366 333399 3333CC 3333FF 336600 336633 336666 336699 3366CC 3366FF 339900 339933 339966 339999 3399CC 3399FF 33CC00 33CC33 33CC66 33CC99 33CCCC 33CCFF 33FF00 33FF33 33FF66 33FF99 33FFCC 33FFFF 660000 660033 660066 660099 6600CC 6600FF 663300 663333 663366 663399 6633CC 6633FF 666600 666633 666666 666699 6666CC 6666FF 669900 669933 669966 669999 6699CC 6699FF 66CC00 66CC33 66CC66 66CC99 66CCCC 66CCFF 66FF00 66FF33 66FF66 66FF99 66FFCC 66FFFF 990000 990033 990066 990099 9900CC 9900FF 993300 993333 993366 993399 9933CC 9933FF 996600 996633 996666 996699 9966CC 9966FF 999900 999933 999966 999999 9999CC 9999FF 99CC00 99CC33 99CC66 99CC99 99CCCC 99CCFF 99FF00 99FF33 99FF66 99FF99 99FFCC 99FFFF CC0000 CC0033 CC0066 CC0099 CC00CC CC00FF CC3300 CC3333 CC3366 CC3399 CC33CC CC33FF CC6600 CC6633 CC6666 CC6699 CC66CC CC66FF CC9900 CC9933 CC9966 CC9999 CC99CC CC99FF CCCC00 CCCC33 CCCC66 CCCC99 CCCCCC CCCCFF CCFF00 CCFF33 CCFF66 CCFF99 CCFFCC CCFFFF FF0000 FF0033 FF0066 FF0099 FF00CC FF00FF FF3300 FF3333 FF3366 FF3399 FF33CC FF33FF FF6600 FF6633 FF6666 FF6699 FF66CC FF66FF FF9900 FF9933 FF9966 FF9999 FF99CC FF99FF FFCC00 FFCC33 FFCC66 FFCC99 FFCCCC FFCCFF FFFF00 FFFF33 FFFF66 FFFF99 FFFFCC FFFFFF";

	var websafeColorArray = allWebsafeColors.split(" ");

	alert(websafeColorArray);

	for(i=0;i<websafeColorArray.length;i++){
	    websafeColorArray[i] = "<br />['"+websafeColorArray[i]+"', 'ColorName']";
	};

	document.write(websafeColorArray);*/
	/*================================================================================================================*/
	var ntc = {

		init: function() {
			var color, rgb, hsl;
			for(var i = 0; i < ntc.names.length; i++)
			{
				color = "#" + ntc.names[i][0];
				rgb = ntc.rgb(color);
				hsl = ntc.hsl(color);
				ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
			}
		},

		name: function(color) {

			color = color.toUpperCase();
			if(color.length < 3 || color.length > 7)
				return ["#000000", "Invalid Color: " + color, false];
			if(color.length % 3 == 0)
				color = "#" + color;
			if(color.length == 4)
				color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);

			var rgb = ntc.rgb(color);
			var r = rgb[0], g = rgb[1], b = rgb[2];
			var hsl = ntc.hsl(color);
			var h = hsl[0], s = hsl[1], l = hsl[2];
			var ndf1 = 0; ndf2 = 0; ndf = 0;
			var cl = -1, df = -1;

			for(var i = 0; i < ntc.names.length; i++)
			{
				if(color == "#" + ntc.names[i][0])
					return ["#" + ntc.names[i][0], ntc.names[i][1], true];

				ndf1 = Math.pow(r - ntc.names[i][2], 2) + Math.pow(g - ntc.names[i][3], 2) + Math.pow(b - ntc.names[i][4], 2);
				ndf2 = Math.pow(h - ntc.names[i][5], 2) + Math.pow(s - ntc.names[i][6], 2) + Math.pow(l - ntc.names[i][7], 2);
				ndf = ndf1 + ndf2 * 2;
				if(df < 0 || df > ndf)
				{
					df = ndf;
					cl = i;
				}
			}

			return (cl < 0 ? ["#000000", "Invalid Color: " + color, false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], false]);
		},

	          // adopted from: Farbtastic 1.2
	          // http://acko.net/dev/farbtastic
	          hsl: function (color) {

	          	var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
	          	var min, max, delta, h, s, l;
	          	var r = rgb[0], g = rgb[1], b = rgb[2];

	          	min = Math.min(r, Math.min(g, b));
	          	max = Math.max(r, Math.max(g, b));
	          	delta = max - min;
	          	l = (min + max) / 2;

	          	s = 0;
	          	if(l > 0 && l < 1)
	          		s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

	          	h = 0;
	          	if(delta > 0)
	          	{
	          		if (max == r && max != g) h += (g - b) / delta;
	          		if (max == g && max != b) h += (2 + (b - r) / delta);
	          		if (max == b && max != r) h += (4 + (r - g) / delta);
	          		h /= 6;
	          	}
	          	return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
	          },

	          // adopted from: Farbtastic 1.2
	          // http://acko.net/dev/farbtastic
	          rgb: function(color) {
	          	return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
	          },
	names: [
			['000000', 'fear'],
	   	   ['000033', 'fear'],
	   	   ['000066', 'sadness'],
	   	   ['000099', 'sadness'],
	   	   ['0000CC', 'trust'],
	   	   ['0000FF', 'trust'],
	   	   ['003300', 'fear'],
	   	   ['003333', 'fear'],
	   	   ['003366', 'sadness'],
	   	   ['003399', 'sadness'],
	   	   ['0033CC', 'trust'],
	   	   ['0033FF', 'trust'],
	   	   ['006600', 'anger'],
	   	   ['006633', 'anger'],
	   	   ['006666', 'sadness'],
	   	   ['006699', 'sadness'],
	   	   ['0066CC', 'trust'],
	   	   ['0066FF', 'trust'],
	   	   ['009900', 'joy'],
	   	   ['009933', 'joy'],
	   	   ['009966', 'joy'],
	   	   ['009999', 'joy'],
	   	   ['0099CC', 'joy'],
	   	   ['0099FF', 'joy'],
	   	   ['00CC00', 'joy'],
	   	   ['00CC33', 'joy'],
	   	   ['00CC66', 'joy'],
	   	   ['00CC99', 'joy'],
	   	   ['00CCCC', 'joy'],
	   	   ['00CCFF', 'joy'],
	   	   ['00FF00', 'joy'],
	   	   ['00FF33', 'joy'],
	   	   ['00FF66', 'joy'],
	   	   ['00FF99', 'joy'],
	   	   ['00FFCC', 'joy'],
	   	   ['00FFFF', 'joy'],
	   	   ['330000', 'fear'],
	   	   ['330033', 'fear'],
	   	   ['330066', 'fear'],
	   	   ['330099', 'trust'],
	   	   ['3300CC', 'trust'],
	   	   ['3300FF', 'trust'],
	   	   ['333300', 'disgust'],
	   	   ['333333', 'sadness'],
	   	   ['333366', 'sadness'],
	   	   ['333399', 'trust'],
	   	   ['3333CC', 'trust'],
	   	   ['3333FF', 'trust'],
	   	   ['336600', 'disgust'],
	   	   ['336633', 'disgust'],
	   	   ['336666', 'sadness'],
	   	   ['336699', 'sadness'],
	   	   ['3366CC', 'sadness'],
	   	   ['3366FF', 'joy'],
	   	   ['339900', 'joy'],
	   	   ['339933', 'joy'],
	   	   ['339966', 'joy'],
	   	   ['339999', 'sadness'],
	   	   ['3399CC', 'sadness'],
	   	   ['3399FF', 'sadness'],
	   	   ['33CC00', 'joy'],
	   	   ['33CC33', 'joy'],
	   	   ['33CC66', 'joy'],
	   	   ['33CC99', 'joy'],
	   	   ['33CCCC', 'joy'],
	   	   ['33CCFF', 'joy'],
	   	   ['33FF00', 'anticipation'],
	   	   ['33FF33', 'joy'],
	   	   ['33FF66', 'joy'],
	   	   ['33FF99', 'joy'],
	   	   ['33FFCC', 'joy'],
	   	   ['33FFFF', 'joy'],
	   	   ['660000', 'anger'],
	   	   ['660033', 'anger'],
	   	   ['660066', 'anger'],
	   	   ['660099', 'joy'],
	   	   ['6600CC', 'fear'],
	   	   ['6600FF', 'fear'],
	   	   ['663300', 'anger'],
	   	   ['663333', 'anger'],
	   	   ['663366', 'disgust'],
	   	   ['663399', 'fear'],
	   	   ['6633CC', 'joy'],
	   	   ['6633FF', 'joy'],
	   	   ['666600', 'disgust'],
	   	   ['666633', 'disgust'],
	   	   ['666666', 'sadness'],
	   	   ['666699', 'fear'],
	   	   ['6666CC', 'sadness'],
	   	   ['6666FF', 'joy'],
	   	   ['669900', 'disgust'],
	   	   ['669933', 'disgust'],
	   	   ['669966', 'disgust'],
	   	   ['669999', 'disgust'],
	   	   ['6699CC', 'sadness'],
	   	   ['6699FF', 'joy'],
	   	   ['66CC00', 'joy'],
	   	   ['66CC33', 'joy'],
	   	   ['66CC66', 'joy'],
	   	   ['66CC99', 'joy'],
	   	   ['66CCCC', 'joy'],
	   	   ['66CCFF', 'joy'],
	   	   ['66FF00', 'anticipation'],
	   	   ['66FF33', 'anticipation'],
	   	   ['66FF66', 'anticipation'],
	   	   ['66FF99', 'joy'],
	   	   ['66FFCC', 'joy'],
	   	   ['66FFFF', 'joy'],
	   	   ['990000', 'anger'],
	   	   ['990033', 'anger'],
	   	   ['990066', 'anger'],
	   	   ['990099', 'fear'],
	   	   ['9900CC', 'joy'],
	   	   ['9900FF', 'joy'],
	   	   ['993300', 'anger'],
	   	   ['993333', 'anger'],
	   	   ['993366', 'fear'],
	   	   ['993399', 'joy'],
	   	   ['9933CC', 'fear'],
	   	   ['9933FF', 'joy'],
	   	   ['996600', 'disgust'],
	   	   ['996633', 'disgust'],
	   	   ['996666', 'disgust'],
	   	   ['996699', 'sadness'],
	   	   ['9966CC', 'fear'],
	   	   ['9966FF', 'joy'],
	   	   ['999900', 'disgust'],
	   	   ['999933', 'disgust'],
	   	   ['999966', 'disgust'],
	   	   ['999999', 'sadness'],
	   	   ['9999CC', 'sadness'],
	   	   ['9999FF', 'sadness'],
	   	   ['99CC00', 'disguest'],
	   	   ['99CC33', 'disgust'],
	   	   ['99CC66', 'sadness'],
	   	   ['99CC99', 'sadness'],
	   	   ['99CCCC', 'sadness'],
	   	   ['99CCFF', 'joy'],
	   	   ['99FF00', 'joy'],
	   	   ['99FF33', 'joy'],
	   	   ['99FF66', 'joy'],
	   	   ['99FF99', 'joy'],
	   	   ['99FFCC', 'joy'],
	   	   ['99FFFF', 'joy'],
	   	   ['CC0000', 'anger'],
	   	   ['CC0033', 'anger'],
	   	   ['CC0066', 'sadness'],
	   	   ['CC0099', 'joy'],
	   	   ['CC00CC', 'joy'],
	   	   ['CC00FF', 'joy'],
	   	   ['CC3300', 'anger'],
	   	   ['CC3333', 'anger'],
	   	   ['CC3366', 'joy'],
	   	   ['CC3399', 'joy'],
	   	   ['CC33CC', 'joy'],
	   	   ['CC33FF', 'joy'],
	   	   ['CC6600', 'disgust'],
	   	   ['CC6633', 'disgust'],
	   	   ['CC6666', 'sadness'],
	   	   ['CC6699', 'disgust'],
	   	   ['CC66CC', 'joy'],
	   	   ['CC66FF', 'joy'],
	   	   ['CC9900', 'sadness'],
	   	   ['CC9933', 'sadness'],
	   	   ['CC9966', 'sadness'],
	   	   ['CC9999', 'sadness'],
	   	   ['CC99CC', 'sadness'],
	   	   ['CC99FF', 'joy'],
	   	   ['CCCC00', 'sadness'],
	   	   ['CCCC33', 'sadness'],
	   	   ['CCCC66', 'sadness'],
	   	   ['CCCC99', 'sadness'],
	   	   ['CCCCCC', 'sadness'],
	   	   ['CCCCFF', 'sadness'],
	   	   ['CCFF00', 'surprise'],
	   	   ['CCFF33', 'surprise'],
	   	   ['CCFF66', 'joy'],
	   	   ['CCFF99', 'joy'],
	   	   ['CCFFCC', 'joy'],
	   	   ['CCFFFF', 'joy'],
	   	   ['FF0000', 'surprise'],
	   	   ['FF0033', 'surprise'],
	   	   ['FF0066', 'love'],
	   	   ['FF0099', 'joy'],
	   	   ['FF00CC', 'joy'],
	   	   ['FF00FF', 'joy'],
	   	   ['FF3300', 'surprise'],
	   	   ['FF3333', 'joy'],
	   	   ['FF3366', 'joy'],
	   	   ['FF3399', 'joy'],
	   	   ['FF33CC', 'joy'],
	   	   ['FF33FF', 'joy'],
	   	   ['FF6600', 'anticipation'],
	   	   ['FF6633', 'anticipation'],
	   	   ['FF6666', 'joy'],
	   	   ['FF6699', 'joy'],
	   	   ['FF66CC', 'joy'],
	   	   ['FF66FF', 'joy'],
	   	   ['FF9900', 'anticipation'],
	   	   ['FF9933', 'anticipation'],
	   	   ['FF9966', 'anticipation'],
	   	   ['FF9999', 'joy'],
	   	   ['FF99CC', 'joy'],
	   	   ['FF99FF', 'joy'],
	   	   ['FFCC00', 'anticipation'],
	   	   ['FFCC33', 'anticipation'],
	   	   ['FFCC66', 'joy'],
	   	   ['FFCC99', 'joy'],
	   	   ['FFCCCC', 'joy'],
	   	   ['FFCCFF', 'joy'],
	   	   ['FFFF00', 'surprise'],
	   	   ['FFFF33', 'surprise'],
	   	   ['FFFF66', 'joy'],
	   	   ['FFFF99', 'joy'],
	   	   ['FFFFCC', 'joy'],
	   	   ['FFFFFF', 'joy']
	]
}

ntc.init();


	//=========================================turn RGB into websafe================================
	var style;
	var audio;
	var time;
/*	function timeUpdate(){
		console.log("Maybe:");
	}
	$('#player').bind('timeupdate', timeUpdate());*/
	function getSongs(mood) {
		//alert(mood);
		//mood = 'happy';
		$.ajax({
			url:"php/8track.php",
			data: 'mood='+mood,
			crossDomain: false,
			dataType:"json",
			success: function(data){
				var title = data['title'];
				var artist = data['artist'];
				var track = data['track'];
				/*var style = "<audio id='player'><source src="+track+"></audio><div id='audioplayer'><div class='mood-title'><div class='playlist flex direction-column'><div class='playlist-based'>Playlist Based On</div><div class='playlist-emotion'>"+mood+"</div></div></div><div class='player-main'><div class='player-contents flex direction-row align-center'><button id='pButton' class='play' onclick='play()'></button><div class='player-song'><p class='song-name'>"+title+"</p><p class='artist-name'>"+artist+"</p></div><div class='timestamp'>5:58</div></div><div id='timeline'><div id='playhead'></div></div></div></div>";
				$('#stuffhere').html(style);*/
				console.log(mood+" "+title+" "+artist+" "+track);
				$(".playlist-emotion").html(mood);
				$(".song-name").html(title);
				$(".artist-name").html(artist);
				$("#player").attr("src",track);
				playPause();
				$('#player').on('ended', function() { //this makes the next song come
					getSongs(emoCombo1);
					//alert('fired');
				});
			}
		});
		$('.loader').fadeOut(function(){
			$('html,body').animate({
			    scrollTop: $('#lifeForce').offset().top
			}, 1000);
			$('.imgOptionWide').fadeOut(200, function(){
				$('.imgOption').fadeIn(200);
			});
			return false;
		});
	};

	function superDuperRoundingMagicMachine(soiledIt){
		if (soiledIt < 26){
			soiledIt = 00;
		}
		else if (soiledIt > 25 && soiledIt < 77){
			soiledIt = 51;
		}
		else if (soiledIt > 76 && soiledIt < 128){
			soiledIt = 102;
		}
		else if (soiledIt > 127 && soiledIt < 179){
			soiledIt = 153;
		}
		else if (soiledIt > 178 && soiledIt < 230){
			soiledIt = 204;
		}
		else if (soiledIt > 229){
			soiledIt = 255;
		}
		return soiledIt;
	}
	var r = superDuperRoundingMagicMachine(firstcolorR);
	var g = superDuperRoundingMagicMachine(firstcolorG);
	var b = superDuperRoundingMagicMachine(firstcolorB);

	var r2 = superDuperRoundingMagicMachine(secondcolorR);
	var g2 = superDuperRoundingMagicMachine(secondcolorG);
	var b2 = superDuperRoundingMagicMachine(secondcolorB);

	var r3 = superDuperRoundingMagicMachine(thirdcolorR);
	var g3 = superDuperRoundingMagicMachine(thirdcolorG);
	var b3 = superDuperRoundingMagicMachine(thirdcolorB);

	var r4 = superDuperRoundingMagicMachine(fourthcolorR);
	var g4 = superDuperRoundingMagicMachine(fourthcolorG);
	var b4 = superDuperRoundingMagicMachine(fourthcolorB);

	var r5 = superDuperRoundingMagicMachine(fifthcolorR);
	var g5 = superDuperRoundingMagicMachine(fifthcolorG);
	var b5 = superDuperRoundingMagicMachine(fifthcolorB);
//==============================================================================================
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}   
	    //alert(r + "  " + g + " " + b);
	    var hexcolor = rgbToHex(r,g,b);
	    var hexcolor2 = rgbToHex(r2,g2,b2);
	    var hexcolor3 = rgbToHex(r3,g3,b3);
	    var hexcolor4 = rgbToHex(r4,g4,b4);
	    var hexcolor5 = rgbToHex(r5,g5,b5);

	    var n_match  = ntc.name(hexcolor);
	        n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
	        n_name       = n_match[1]; // This is the text string for the name of the match
	        n_exactmatch = n_match[2]; // True if exact color match, False if close-match


	var n_match2  = ntc.name(hexcolor2);
		    n_rgb2        = n_match2[0]; // This is the RGB value of the closest matching color
		    n_name2       = n_match2[1]; // This is the text string for the name of the match
		    n_exactmatch2 = n_match2[2]; // True if exact color match, False if close-match

		    var n_match3  = ntc.name(hexcolor);
	    	n_rgb3        = n_match3[0]; // This is the RGB value of the closest matching color
	    	n_name3       = n_match3[1]; // This is the text string for the name of the match
	    	n_exactmatch3 = n_match3[2]; // True if exact color match, False if close-match

	    	var mood = "sad";
	    	var moodName;
	    	var mood2;
	    	var moodName2;
	    	var mood3;
	    	var moodName3;

	    	var e1 = n_name;
	    	var e2 = n_name2;
	    	var e3 = n_name3;
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

	    /*function getRandomInt(min, max) {
	    	return Math.floor(Math.random() * (max - min + 1)) + min;
	    }*/

	    var emoNum1 = emotionToNum(e1);
	    var emoNum2 = emotionToNum(e2);
	    var emoNum3 = emotionToNum(e3);
	    var emoCombo1 =emotionCombo[emoNum1][emoNum2];
	    var emoCombo2 =emotionCombo[emoNum2][emoNum3];
	    var emoCombo3 =emotionCombo[emoNum1][emoNum3];

	    console.log("Simple Emotion 1: "+e1+" "+emoNum1);
	    console.log("Simple Emotion 2: "+e2+" "+emoNum2);
	    console.log("Simple Emotion 3: "+e3+" "+emoNum3);
	    console.log("Complex Emotion 1: "+emoCombo1);
	    console.log("Complex Emotion 2: "+emoCombo2);
	    console.log("Complex Emotion 3: "+emoCombo3);

	    //console.log("Random");
	    //console.log(e1+" "+emoNum1r);
	    //console.log(e2+" "+emoNum2r);
	    //console.log(emotionCombo[emoNum1r][emoNum2r]);

	    var colorPalette = 
	    "<h2>Color Palette</h2>"+
	    "<h1>"+emoCombo1+"</h1>"+
	    "<div id='colorsInHere'>"+
	    "<div class='swatches'></div><div class='swatches'></div><div class='swatches'></div><div class='swatches'></div><div class='swatches'></div>"+
	    "</div>";

	//alert("Mood # is: "+ mood);
	//$.get( "php/undertone.php", { themood: mood } )
	//.done(function( data ) {
	//alert( "Data Loaded: " + data );
	        getSongs(emoCombo1);
	        $('#stuffhere').html(style);
	        $('#colorPalette').html(colorPalette);
	        $(".swatches:first-child").css("background-color",hexcolor);
	        $(".swatches:nth-child(2)").css("background-color",hexcolor2);
	        $(".swatches:nth-child(3)").css("background-color",hexcolor3);
	        $(".swatches:nth-child(4)").css("background-color",hexcolor4);
	        $(".swatches:nth-child(5)").css("background-color",hexcolor5);

	        //$("body").css("background-color",hexcolor);     CHANGES THE BACKGROUND TO PRIMARY COLOR
			// });
};

	    //};//);
$("#camera").click(function(){
	var sayCheese = new SayCheese('#webcam-inner', { snapshots: true });
	$('.imgOption').hide();
	$("#capture").delay(800).fadeIn(1);
	$("#drop-zone").fadeOut(800);
	$("#openWebcam").fadeOut(800);
	sayCheese.on('start', function() {
	     // do something when started	
	         
	 });
	sayCheese.on('snapshot', function(snapshot) {
		var img = document.createElement('img');
		var preview = $(template);
		$(img).on('load', function() {
			var colorThief = new ColorThief();
			paletteArray = colorThief.getPalette(img, 5);
			colorToMood();
			$('#stuffhere').show();
			$('#colorPalette').show();
			$('.imgOption').show();
			$("#webcam").hide();
		});
		img.src = snapshot.toDataURL('image/png');
		$( "#lifeForce" ).append('<div class="preview"><h2>Your Image</h2><span class="imageHolder">');
		$(".imageHolder").append(img);
		$(".imageHolder").append('</span></div>');
		sayCheese.stop();
		$("#container-element").hide();
		$("#capture").hide();
	});
	sayCheese.start();
	$("#capture").click(function(img){
		$('.loader').fadeIn().delay(1000); 
		sayCheese.takeSnapshot();
		
	});
});

	var music = document.getElementById('player'); // id for audio element
	var duration; // Duration of audio clip
	var pButton = document.getElementById('pButton'); // play button

	var playhead = document.getElementById('playhead'); // playhead

	var timeline = document.getElementById('timeline'); // timeline
	// timeline width adjusted for playhead
	var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

	// timeupdate event listener
	music.addEventListener("timeupdate", timeUpdate, false);

	function playPause(){
		//Play and Pause
			// start music
			if (music.paused) {
				music.play();
				// remove play, add pause
				pButton.className = "";
				pButton.className = "pause";
			} else { // pause music
				music.pause();
				// remove pause, add play
				pButton.className = "";
				pButton.className = "play";
			}
	}

	$('#pButton').on("click", function(){
		playPause();
	});

	music.addEventListener('timeupdate',function(){
		var totalTime = Math.floor(music.duration);
	    var currentTime = Math.round(music.currentTime);
	    var timeLeft= totalTime - currentTime;
	    var min = Math.floor(timeLeft/60);
	    var second = Math.floor(timeLeft % 60);
	    var sec;
	    

	    if(second<10){ sec = "0"+second }
	    	else { sec = second; }
	    $('.timestamp').html(min+":"+sec);
	    /*if(currentTime<10){
		    $('.timestamp').html("0:0"+currentTime);
		} else if(currentTime<60 && currentTime >= 10){
			$('.timestamp').html("0:"+currentTime);
		} else if(currentTime>=60){
			$('.timestamp').html("0:"+currentTime-60);
		}*/
	},false);

	//Makes timeline clickable
	timeline.addEventListener("click", function (event) {
		moveplayhead(event);
		music.currentTime = duration * clickPercent(event);
	}, false);

	// Makes playhead draggable 
	playhead.addEventListener('mousedown', mouseDown, false);
	window.addEventListener('mouseup', mouseUp, false);

	// Boolean value so that mouse is moved on mouseUp only when the playhead is released 
	var onplayhead = false;

	// Gets audio file duration
	music.addEventListener("canplaythrough", function () {
		duration = music.duration;  
	}, false);

	// returns click as decimal (.77) of the total timelineWidth
	function clickPercent(e) {
		return (event.pageX - timeline.offsetLeft) / timelineWidth;
	}

	// mouseDown EventListener
	function mouseDown() {
		onplayhead = true;
		window.addEventListener('mousemove', moveplayhead, true);
		music.removeEventListener('timeupdate', timeUpdate, false);
	}
	// mouseUp EventListener
	// getting input from all mouse clicks
	function mouseUp(e) {
		if (onplayhead == true) {
			moveplayhead(e);
			window.removeEventListener('mousemove', moveplayhead, true);
			// change current time
			music.currentTime = duration * clickPercent(e);
			music.addEventListener('timeupdate', timeUpdate, false);
		}
		onplayhead = false;
	}
	// mousemove EventListener
	// Moves playhead as user drags
	function moveplayhead(e) {
		var newMargLeft = e.pageX - timeline.offsetLeft;
		if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
			playhead.style.marginLeft = newMargLeft + "px";
		}
		if (newMargLeft < 0) {
			playhead.style.marginLeft = "0px";
		}
		if (newMargLeft > timelineWidth) {
			playhead.style.marginLeft = timelineWidth + "px";
		}
	}

	// timeUpdate 
	// Synchronizes playhead position with current point in audio 
	function timeUpdate() {
		var playPercent = timelineWidth * (music.currentTime / duration);
		playhead.style.marginLeft = playPercent + "px";
		if (music.currentTime == duration) {
			pButton.className = "";
			pButton.className = "play";
		}
	}

});


