<html>
    <head>
        <title>clase 18 de Octubre</title>
    </head>
    <body>
        <?php
        //pi se almacena en una funcion
        echo(pi()."<br>");
        //Maximos y mínimos
        echo (min(2,4,5,12,12,11,44));
        echo ("<br>".max(2,3,4,5,6,7));
        //cadena rara que no macuerdo como se llama
        $a = <<<CADENA
                <br>tralari que te vi<br>
                CADENA;
        echo $a;
        //valor absoluto
        echo("<br>".abs(-4564654567));
        //raiz
        echo("<br>".sqrt(49.3));
        //redondeo
        echo("<br>".round(25.4567));
        echo("<br>".round(25.4567,3));
        //por abajo
        echo("<br>".floor(25.4567));
        //por arriba
        echo("<br>".ceil(25.4567));
        //numeros aleatorios
        echo "<br>".rand(5,70);
        $var = "hola";
        echo '<br>'.gettype($var);
        echo("<br>".is_string($var));
        echo '<br>';
        $x=123;
        //echo is_;
        function prueba(){
            global $x;
            $b=$x;
            echo '<hr>'.$b;
            
        }
        prueba();
        ?>                
    </body>
</html>

