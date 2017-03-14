function getSongs(mood) {
	alert(mood);
	$.ajax({
		url:"php/8track.php",
		data: 'mood='+mood,
		crossDomain: false,
		dataType:"json",
		success: function(data){
			var title = data['title'];
			var artist = data['artist'];
			var track = data['track'];
			var style = "<audio controls><source src='"+track+"' type='audio/mpeg'></audio>";
			document.write(title+artist+style);
		}
	});
};