<?php
error_reporting(0);
$contenido=file_get_contents('..\sources\all.xml');
$xml=simplexml_load_string($contenido);
$json=json_encode($xml);
echo $json;
?>