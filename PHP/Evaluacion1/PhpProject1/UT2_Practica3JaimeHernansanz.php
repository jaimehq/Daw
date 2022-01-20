<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Ejercicios tema2 PHP</title>
    </head>
    <body>
        <?php
        echo "Ejercicio 1:<br>";
        echo "La fecha actual es: ". date("d-m-Y", time())."<hr>";
        
        
        echo "Ejercicio 2:<br>";
        $fecha=date("d-m-Y", time());
        $fecha= strtotime("-3 days");
        echo "La fecha menos 3 dias es: ".date("d-m-Y",$fecha)."<hr>";
        
        
        echo "Ejercicio 3:<br>";
        function comprobarFecha($cadena){
            $arrayFecha= explode("-", $cadena);
            if(checkdate($arrayFecha[1], $arrayFecha[0], $arrayFecha[2])){
                return "La fecha es valida";
            }else{
                return "La fecha no es valida";
            }
        }
        echo comprobarFecha("35-2-1989")."<hr>";
        
        
        echo "Ejercicio 4:<br>";
        function calcDias($fecha1,$fecha2){
            $arrayFecha1= explode("-", $fecha1);
            $arrayFecha2= explode("-", $fecha2);            
            $fechaInicial= mktime(0,0,0,$arrayFecha1[1],$arrayFecha1[0],$arrayFecha1[2]);
            $fechaFinal=mktime(0,0,0,$arrayFecha2[1],$arrayFecha2[0],$arrayFecha2[2]);
            $diferenciaSeg=$fechaFinal - $fechaInicial;
            $diferenciaDias=$diferenciaSeg/(60*60*24);
            return abs($diferenciaDias);            
        }
        $f1="22-02-2020";
        $f2="25-02-2020";
        $difDias=calcDias($f1, $f2);
        echo "La diferencia entre la feha ".$f1." y ".$f2." es de ".$difDias." dias<hr>";
        
        
        echo "Ejercicio 5:<br>";   
        function sumarHoras($horas,$fecha){
            $arrayFecha= explode("-", $fecha);
            $fechaCompleta=mktime(0,0,0,$arrayFecha[1],$arrayFecha[0],$arrayFecha[2]);
            $horasEnSeg=$horas*60*60;
            return $fechaCompleta+$horasEnSeg;
        }
        $h=48;
        $date="01-01-2021";
        $resultado= sumarHoras($h, $date);
        echo "La fecha ".$date." con ".$h." horas mas es: ".date("d-m-Y",$resultado)."<hr>";
        
        echo "Ejercicio6:<br>";
        $a=8;
        $b=3;
        $c=3;
        echo "El resultado de $a == $b es: ";
        echo var_dump($a == $b)."<br>";  
        echo "El resultado de $a != $b es: ";
	echo var_dump($a != $b)."<br>";
        echo "El resultado de $a < $b es: ";
	echo var_dump($a < $b)."<br>";
        echo "El resultado de $a > $b es: ";
	echo var_dump($a > $b)."<br>";
        echo "El resultado de $a >= $c es: ";
	echo var_dump($a >= $c)."<br>";
        echo "El resultado de $a <= $c es: ";
	echo var_dump($a <= $c)."<hr>";
        
        echo "Ejercicio7:<br>";
        echo "El resultado de ($a == $b) && ($c > $b) es: ";
        echo var_dump(($a == $b) && ($c > $b))."<br>"; 
        echo "El resultado de ($a == $b) || ($b == $c) es: ";
	echo var_dump(($a == $b) || ($b == $c))."<br>"; 
        echo "El resultado de ($b <= $c) es: ";
	echo var_dump(($b <= $c))."<hr>";  

        echo "Ejercicio8:<br>";
        echo phpinfo();       
        
        ?>
    </body>
</html>
