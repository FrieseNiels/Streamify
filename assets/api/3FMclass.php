<?php
	include('3FMclass/Response3FM.php');
	include('3FMclass/Helper3FM.php');

	$helper = new Helper3FM();
$helper->get3FMNowPlaying();
$nowPlaying = $helper->getResponse3FM();
echo ucwords($nowPlaying->artist . ' - ' . $nowPlaying->title);

?>