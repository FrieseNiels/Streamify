<?php
	header('Content-Type: text/javascript');
	$buffer = true;
	
	$path = realpath(dirname(__FILE__)) . '/src';
	$list = scandir($path);
	if($buffer) ob_start();

	foreach ($list as $file) {
		if($file == '.' || $file== '..') continue;
		if(!preg_match('/\.(js)$/', $file)) continue;
		echo '/*'. $file . '*/' . "\n";
		echo file_get_contents($path . '/' . $file) . "\n \n";		
	}
	
	if(!$buffer) die();
	$content = ob_get_clean();

	die($content);
?> 