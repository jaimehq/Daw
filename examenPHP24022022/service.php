<?php
//Jaime Hernansanz
error_reporting(0);
$uri = 'https://www.dataaccess.com/webservicesserver/numberconversion.wso';
$cliente = new SoapClient('https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL', array('location' => $url));
$stdClass = $cliente->NumberToWords(array('ubiNum' => $_POST['numero']));
$cadenita = ($stdClass->NumberToWordsResult);
echo $cadenita;
?>