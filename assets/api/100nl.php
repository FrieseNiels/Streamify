<?php 
	include_once('simple_html_dom.php');
	$url = "http://stream.100p.nl/status.xsl";
	$html = file_get_html($url);
	$arr = array();
	foreach($html->find('td[class=streamdata]') as $element){
		$arr[]=$element->innertext . '<br>';
	}

	$current = (explode('-', $arr[9]));

	echo strip_tags($current[0]) . ' - ' . strip_tags($current[1]);

?>		