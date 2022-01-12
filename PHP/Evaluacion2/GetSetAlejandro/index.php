<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Mis clases</title>
    </head>
    <body>
        <?php
        // Cargo mis ficheros de clase
        require_once 'Producto.php';
        require_once 'DB.php';

        // Creo objeto de clase Producto, relleno y muestro contenido
        $p = new Producto();
        $p->nombre = 'Samsung Galaxy S6';
        $p->color = 'rojo';
        $p->muestra();

        // Ahora muestro la info de conexión a la base de datos
        echo '<h1>Datos de conexión a mi base de datos</h1>';
        echo DB::HOST . '</br>';
        echo DB::DB . '</br>';
        echo DB::USER . '</br>';
        echo DB::PASSWORD . '</br>';
        ?>
    </body>
</html>
