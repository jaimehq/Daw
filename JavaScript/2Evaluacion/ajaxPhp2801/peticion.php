<?php
error_reporting(0);
$provincia=$_GET['provincia'];
$datos=file_get_contents('http://opendata.jcyl.es/ficheros/cct/wtur/monumentos.json');
$datosJson=json_decode($datos);
$monumentos=$datosJson->monumentos;

$arrayMonumentos=array();
foreach($monumentos as $monumento){
    if($monumento->poblacion->provincia==$provincia){
        array_push($arrayMonumentos,$monumento);
    }
}

echo json_encode($arrayMonumentos);


?>