<?php
/*$ch = curl_init();
$timeout = 2; // laden mag maximaal 2 seconden duren
curl_setopt ($ch, CURLOPT_URL, 'http://stream.radio538.nl/538play/nowplaying.xml');
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$file_contents = curl_exec($ch);
curl_close($ch);*/

$xmlstring = file_get_contents("http://stream.radio538.nl/538play/nowplaying.xml");

$xml = simplexml_load_string($xmlstring, "SimpleXMLElement", LIBXML_NOCDATA);
$json = json_encode($xml);
$array = json_decode($json,TRUE);


echo strtolower($array['now']['artist']) . ' - ' . strtolower($array['now']['title']);

?>