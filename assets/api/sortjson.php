<?php
	$location = $_SERVER['DOCUMENT_ROOT'] . '/assets/api/streams.json';
	$json = file_get_contents($location);
	$json = utf8_encode($json);
	$data = json_decode($json, true);

	/*echo '<pre>';
	echo var_dump($data);
	echo '</pre>';*/


	$new_data = array();
	foreach($data as $key => $val){
		$new_data[$key] = $val;
	}
	array_multisort($new_data, SORT_DESC, $data);
	echo '<pre>';
	echo var_dump($new_data);
	echo '</pre>';
	//file_put_contents($location, json_encode($new_data, JSON_FORCE_OBJECT));
?>