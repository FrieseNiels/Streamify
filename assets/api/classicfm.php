<?php 
	$xmlstring = file_get_contents('http://www.classicfm.nl/cdn/player_classicfm.xml');
	$xml = simplexml_load_string($xmlstring, "SimpleXMLElement", LIBXML_NOCDATA);
	$json = json_encode($xml);
	$array = json_decode($json,TRUE);

	$data = array();
	foreach($array as $key => $value){
		$data[] = $value;
	}

	//echo var_dump($data[2]['attributes']['attribute']);

	echo str_replace('-', '/', $data[2]['attributes']['attribute'][4]) . ' - ' . $data[2]['attributes']['attribute'][0];
?>
