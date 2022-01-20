<html>
    <head>
        <title>Practica 2</title>
    </head>
    <body>
        <?php
            //Realiza un programa que calcule la media de tres numeros
        $a=20;
        $b=30;
        $media;
        $media=($a+$b)/2;
        echo "La media de ".$a." y ".$b." es: ".$media;
        echo "<hr>";
        //Ejercicio 2
        //Realiza un programa que intercambie el valor de dos variables
        $variable1="La primera";
        $variable2= "La segunda";
        $aux;
        echo "La variable 1 es ".$variable1." y la variable 2 es ".$variable2."<br>";
        $aux=$variable1;
        $variable1=$variable2;
        $variable2=$aux;
        echo "Despues de modificarlo es:<br>";
        echo "La variable 1 es ".$variable1." y la variable 2 es ".$variable2."<hr>";
        //Ejercicio 3
        //Realiza un programa que desglose una cantidad de euros en billetes de 10 y 5 y monedas de 1€
        $cantidad=653;
        $billete10=0;
        $billete5=0;
        $moneda1=0;
        echo "La cantidad de ".$cantidad."€ se desglosa en:<br>";
        $billete10=(int)($cantidad/10);
        $cantidad=$cantidad-$billete10*10;
        $billete5=(int)($cantidad/5);
        $cantidad=$cantidad-$billete5*5;
        $moneda1=$cantidad/1;
        $cantidad=$cantidad-$moneda1;
        if($billete10>0){
            echo $billete10." billetes de 10€, ".$billete5. " billetes de 5€ y ".$moneda1." monedas de €";
        }else if($billete5>0){
            echo $billete5. " billete de 5€ y ".$moneda1." monedas de €";
        }else{
            echo $moneda1." monedas de €";
        }
        
        ?>

    </body>
</html>
