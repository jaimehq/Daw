<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
        
            require_once './classes/Suma.php';
            require_once './classes/Resta.php';
            
            // Creamos objetos de suma y resta
            $obj1 = new Suma();
            $obj2 = new Resta();
            
            // Realizamos la carga de valores
            $obj1->cargar1(5);
            $obj1->cargar2(8.4523);
            
            $obj2->cargarYRestar(43, 7.42);
            
            // Realizamos la operación de suma
            $obj1->sumar();
            
            // Mostramos resultados
            echo "La suma de $obj1->valor1 y $obj1->valor2 es "
                . $obj1->devolverResultado()." <br>";
            echo "La resta de $obj2->valor1 y $obj2->valor2 es "
                . $obj2->devolverResultado()." <br>";
        
        ?>
    </body>
</html>
