<?php 
	$location = "http://www.skyradio.nl/cdn/player_skyradio.json";
	$json = file_get_contents($location);
	$json = utf8_encode($json);
	$data = json_decode($json, true);

	echo $data['current']['artist'] . ' - ' . $data['current']['title'];
?>	