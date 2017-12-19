<?php
	$location = "http://www.arrow.nl/nowplaying/nowplaying.php";
	$json = file_get_contents($location);
	$data = json_decode($json, true);

	echo strtolower($data['artist']) . ' - ' . strtolower($data['song']);

?>