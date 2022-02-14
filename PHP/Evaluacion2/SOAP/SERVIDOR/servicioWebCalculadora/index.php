<?php
    require_once './calcula.php';
    $server = new SoapServer(null, array('uri'=>''));
    $server->setClass(('Calcula'));
    $server->handle();



?>