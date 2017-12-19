<?php
	$html = file_get_contents("http://player.radionl.fm/js/currentsong.php?url=http://178.19.127.4:80");
	$current = explode('-', $html);
	echo strtolower(strip_tags($current[0])) . ' - ' . strtolower(strip_tags($current[1]));
?>