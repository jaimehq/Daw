<html>
    <?php
        $salida = "Contenido PHP";
    ?>
    <head>
        <title>
            <?php
            //se puede poner php donde te da la gana
                echo $salida;
            ?>
        </title>
        <meta charset="UTF-8">
    </head>
    <body>
        <?php
        $txt = "Me quedo frito";
        $x =5;
        $y = 8.25;
            echo "<h1>Funcionaá</h1>";
            echo $salida;
            echo "<br>".$txt." prueba a ver que pasa<br>";
            echo $x+$y;
        ?>
    </body>
</html>