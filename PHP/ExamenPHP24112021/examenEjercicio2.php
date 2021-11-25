<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ejercicio2</title>
</head>

<body>
    <?php
    //jaime hernansanz
    $cadena = "";
    try {
        $dwes = new PDO('mysql:host=localhost:3306;dbname=dwes', 'root', '');
        $buscador = $dwes->prepare('SELECT nombre_corto, pvp FROM producto ');
        $cadena = "<table><tr><th>Producto</th><th>Precio</th></tr>";
        if ($buscador->execute()) {
            $row = $buscador->fetch();
            while ($row != null) {
                $cadena .= '<tr><td>' . $row[0] . '</td><td>' . $row[1] . '</td></tr>';
                $row = $buscador->fetch();
            }
            $cadena .= "</table>";
        }
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $dwes->beginTransaction();
            $actualizar = $dwes->prepare('UPDATE producto SET pvp=pvp*(?)where pvp>=(?)');
            $rebaja = 0.9;
            $tope = 100;
            $actualizar->bindParam(1, $rebaja);
            $actualizar->bindParam(2, $tope);
            if (!$actualizar->execute()) throw new Exception("No se ha podido cambiar los precios");
            $actualizar = $dwes->prepare('UPDATE producto SET pvp=pvp*(?)where pvp<(?)');
            $rebaja = 0.95;
            $tope = 100;
            $actualizar->bindParam(1, $rebaja);
            $actualizar->bindParam(2, $tope);
            if (!$actualizar->execute()) throw new Exception("No se ha podido cambiar los precios");
            $actualizar->closeCursor();
            $dwes->commit();
            $buscador = $dwes->prepare('SELECT nombre_corto, pvp FROM producto ');
            $cadena = "<table><tr><th>Producto</th><th>Precio</th></tr>";
            if ($buscador->execute()) {
                $row = $buscador->fetch();
                while ($row != null) {
                    $cadena .= '<tr><td>' . $row[0] . '</td><td>' . $row[1] . '</td></tr>';
                    $row = $buscador->fetch();
                }
                $cadena .= "</table>";
            }
        }
    } catch (Exception $e) {
        $dwes->rollBack();
        $mensajeError = 'Excepción capturada: ' .  $e->getMessage() . '"\n"';
    } finally {
        unset($dwes);
    }

    ?>
    <h1>Este es Nuestro stock:</h1>
    <?php
    echo $cadena;
    ?>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
        <input type="submit" value="REBAJAR POR BLACK FRIDAY">
    </form>
</body>

</html>