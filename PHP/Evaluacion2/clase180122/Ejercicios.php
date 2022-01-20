<html>
    <head>
        <title>Ejercicios</title>
    </head>
    <body>
        <?php
        /*

         * To change this license header, choose License Headers in Project Properties.
         * To change this template file, choose Tools | Templates
         * and open the template in the editor.
         */

        // Ejercicio1
        require_once 'Operacion.php';
        require_once 'Suma.php';

        $op = new Operacion(4, 7);
        $sum = new Suma('Suma', 5, 6);

        var_dump($op);
        var_dump($sum);
        ?>
    </body>
</html>

