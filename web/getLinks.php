<?php

	// $data = file_get_contents($_POST['link']);
	// $data = file_get_contents('http://mp3clan.de/mp3_s2.php?ser='.$_POST['ser'].'&page='.$_POST['page']);
	// print_r($matches);
	// $data = file_get_contents('http://mp3clan.de/mp3_source.php?ser=eminem&page=0');

	// preg_match_all('/<a href="http\:\/\/mp3clan\.de\/dl\.php\?type\=get\&(?:.*?)"/', $data, $matches);


	// foreach ($matches[0] as $value) {
	// 	echo $value.'>'.substr(explode('&name=' ,$value)[1],0,-1).'</a><br/>';
	// }






	$data = file_get_contents('http://mp3clan.de/mp3_source.php?ser='.$_POST['query'].'&page='.$_POST['page']);

	// echo '<a href=http://mp3clan.de/mp3_source.php?ser='.$_POST['query'].'&page='.$_POST['page'].'>Go to page<a/>';

	preg_match_all('/<a href="http\:\/\/mp3clan\.de\/dl\.php\?type\=get\&(?:.*?)"/', $data, $matches);

	echo '<h1 contenteditable="true">'.str_replace('_', ' ',$_POST['query']).'</h1><br/>';
	foreach ($matches[0] as $value) {
		echo $value.'>'.str_replace('_', ' ', substr(explode('&name=' ,$value)[1],0,-1)).'</a>';
	}







?>