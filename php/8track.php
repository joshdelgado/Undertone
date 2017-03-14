<?php session_start();
$token;
$id;
$counter = $_SESSION['counter'];
$end = $_SESSION['end'];
$key = '155e00c31ee00eb4ee33bd0ac11592ef2deafc1a';
$tag = $_GET['mood'];
//$tag = 'happy';
$currentMood = $_SESSION['mood'];
/*if($tag == $currentMood){
	echo 'they matched!';
}
if($tag != $currentMood){    //supposed to change the playlist if a new mood is uploaded....doesnt work yet
	session_destroy();
	echo 'sessions destroyed!';
}*/
if(!$counter){
	if($tag != null && $tag != ''){
		$playlistUrl = "http://8tracks.com/mix_sets/tags:".$tag.".json?api_key=".$key."?api_version=3?&include=mixes&per_page=1";
		$playTokenUrl= "http://8tracks.com/sets/new.json?api_key=".$key;
		//getting the mood playlist
		$playlist = file_get_contents($playlistUrl);
		$playlist = json_decode($playlist);
		$id = $playlist->mix_set->mixes[0]->id;
		//getting the play token
		$playToken = file_get_contents($playTokenUrl);
		$playToken = json_decode($playToken);
		$token = $playToken->play_token;
		//getting the actual track
		$playback = "http://8tracks.com/sets/".$token."/play.json?mix_id=".$id."?api_version=3?api_key=".$key;
		$play = file_get_contents($playback);
		$play = json_decode($play);
		$artist = $play->set->track->performer;
		$title = $play->set->track->name;
		$trackUrl = $play->set->track->track_file_stream_url;
		$place = $play->set->at_beginning;  //tells you if youre at the start of the playlist (T / F)
		$end = $play->set->at_end;			//tells you if there is no more playlist  (T / F)
		$skip = $play->set->skip_allowed;   //if we add skips this will help
			/*echo "<pre>";
			echo "<br><br>";
			var_dump($play);
			echo "</pre>";*/
		$jsonArray = array('title'=>$title,'artist'=>$artist,'track'=>$trackUrl);
		echo json_encode($jsonArray);
		//echo "in top part";
		$_SESSION['counter'] = true;
		$_SESSION['token'] = $token;
		$_SESSION['id'] = $id;
		$_SESSION['end'] = $end;
		$_SESSION['mood'] = $tag;
		//session_destroy();
	}else{
		$jsonArray = array('title'=>'sorry, something went wrong.','artist'=>' ','track'=>' ');
		echo json_encode($jsonArray);
	}
}
if($counter){
	if(!$end){
		$token = $_SESSION['token'];
		$id = $_SESSION['id'];
		$nextPlayback= "http://8tracks.com/sets/".$token."/next.json?mix_id=".$id."&api_version=3?api_key=".$key;
		$next = file_get_contents($nextPlayback);
		$next = json_decode($next);
		//getting the next track in the playlist
		$artist = $next->set->track->performer;
		$title = $next->set->track->name;
		$trackUrl = $next->set->track->track_file_stream_url;
		$end = $next->set->at_end;
			/*echo "<pre>";
			echo "<br><br>";
			var_dump($next);
			echo "</pre>";*/
		if($title == NULL){
			//echo 'its null';
			$jsonArray = array('title'=>'Requests too quick, please','artist'=>'wait and try agian.','track'=>'audio/sadDay.mp3');
			echo json_encode($jsonArray);
		}
		if($title != NULL){
			//echo 'its not null';
			$jsonArray = array('title'=>$title,'artist'=>$artist,'track'=>$trackUrl);
			echo json_encode($jsonArray);
		}
		//echo "in bottom part";
		$_SESSION['end'] = $end;
		$_SESSION['mood'] = $tag;
		//echo $_SESSION['mood'];
		//session_destroy();
	}
	if($end){
		$jsonArray = array('title'=>$title,'artist'=>$artist,'track'=>$trackUrl);
		echo json_encode($jsonArray);
		session_destroy();
	}
}
?>