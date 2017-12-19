<?php
	$html = file_get_contents("http://app.rhr.fm/nowplaying_inc.php");
	echo strip_tags($html);
?>