<html>
    <head>
        <title>Ejercicio 1 Formularios</title>
    </head>
    <body>
        <h1>Introduce el numero que quieras para saber su tabla</h1>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
            Numero:<input type="number" name="num" value="0">  
            <input type="submit">
        </form>
        <?php
        $numero=0;
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $numero=$_POST["num"];
                for ($index = 1; $index < 11; $index++) {
                    echo $numero." X ".$index." = ".($numero*$index)."<br>";
                }
            }
        ?>
    </body>
</html>
