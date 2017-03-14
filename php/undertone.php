<?php


function getData($call){
	$user_request = $call;
	$json = file_get_contents($user_request);
	$obj = json_decode($json, true);
	$moodName;
	return $obj;
}
$user_request = "https://c1571840.web.cddbp.net/webapi/json/1.0/register?client=1571840-9D8015EB4E92ABD4FBD816C7F892E01D";
$user_id = getData($user_request)['RESPONSE'][0]['USER'][0]['VALUE'];
$mood = $_GET['themood'];

if ($mood == '42958'){
    $moodName = 'Aggressive';
} else if ($mood == '65332'){
    $moodName = 'Lively';
} else if ($mood == '65326'){
    $moodName = 'Cool';
} else if ($mood == '42960'){
    $moodName = 'Excited';
} else if ($mood == '42954'){
    $moodName = 'Sophisticated';
} else if ($mood == '42961'){
    $moodName = 'Energizing';
} else if ($mood == '65323'){
    $moodName = 'Romantic';
} else if ($mood == '42949'){
    $moodName = 'Melancholy';
} else if ($mood == '65327'){
    $moodName = 'Gritty';
} else if ($mood == '65332'){
    $moodName = 'Peaceful';
}

//$request = "https://c1571840.web.cddbp.net/webapi/json/1.0/radio/fieldvalues&client=1571840-9D8015EB4E92ABD4FBD816C7F892E01D&user=".$user_id."&fieldname=RADIOMOOD";
//$request = "https://c1571840.web.cddbp.net/webapi/json/1.0/radio/fieldvalues?client=1571840-9D8015EB4E92ABD4FBD816C7F892E01D&user=".$user_id."&fieldname=RADIOMOOD";
//echo($request);
$request = "https://c1571840.web.cddbp.net/webapi/json/1.0/radio/create?mood=".$mood."&client=1571840-9D8015EB4E92ABD4FBD816C7F892E01D&user=".$user_id;
$thecall = getData($request);
echo "<p>playlist based on<h1>" . $moodName . "</h1><br />";
for ($x=0;$x<=4;$x++){
	echo $thecall['RESPONSE'][0]['ALBUM'][$x]['TRACK'][0]['TITLE'][0]['VALUE'];
	echo " by ";
	echo $thecall['RESPONSE'][0]['ALBUM'][$x]['ARTIST'][0]['VALUE'];
	echo "<br><hr>";
}
echo "</p>";
//echo "<pre>";
//print_r($thecall);
//echo "</pre>";
?>