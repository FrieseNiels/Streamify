<?php 
	$location = "http://www.radioveronica.nl/cdn/player_veronica.json";
	$json = file_get_contents($location);
	$json = utf8_encode($json);
	$data = json_decode($json, true);

	echo $data['current']['artist'] . ' - ' . $data['current']['title'];
?>	