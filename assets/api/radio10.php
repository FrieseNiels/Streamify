<?php
	$html = file_get_contents("http://www.radio10.nl/nowonair/nuopradio10.html");
	$html = nl2br($html);

	$data = preg_split('/<br[^>]*>/i', $html);

	echo strip_tags($data[3]) . ' - ';
	echo strip_tags($data[4]);

?>