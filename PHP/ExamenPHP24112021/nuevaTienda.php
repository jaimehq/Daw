<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creacion de tiendas</title>
</head>

<body>
    <?php
    if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['cod']) && isset($_GET['nombre'])) {
        try {
            $dwes = new PDO('mysql:host=localhost:3306;dbname=dwes', 'root', '');
            $dwes->beginTransaction();
            $sql = "SELECT cod FROM tienda";
            $resultado = $dwes->query($sql);
            $row = $resultado->fetch();
            while ($row != null) {
                if ($row[0] === $_GET['cod']) throw new Exception("El codigo de la tienda ya existe");
                $row = $resultado->fetch();
            }
            $insertar = $dwes->prepare('INSERT INTO tienda (cod,nombre,tlf) VALUES (?,?,?)');
            $codigoTienda = $_GET['cod'];
            $insertar->bindParam(1, $codigoTienda);
            $insertar->bindParam(2, $_GET['nombre']);
            $insertar->bindParam(3, $_GET['tlf']);
            if (!$insertar->execute()) throw new Exception("No se ha podido agregar la tienda");
            $sql = "SELECT cod FROM producto";
            //$resultado->closeCursor();
            $resultado = $dwes->query($sql);
            $insertar2 = $dwes->prepare('INSERT INTO stock (producto,tienda,unidades) VALUES (?,' . $codigoTienda . ',1)');
            $row = $resultado->fetch();
            while ($row != null) {
                $insertar2->bindParam(1, $row[0]);
                if (!$insertar2->execute()) throw new Exception("No se ha podido agregar el stock");                
                $row = $resultado->fetch();
            }
            $buscador = $dwes->prepare('SELECT producto, tienda, unidades FROM stock WHERE tienda='.$codigoTienda);
            $cadena = "<table><tr><th>Producto</th><th>Tienda</th><th>Unidades</th></tr>";
            if ($buscador->execute()) {
                $row = $buscador->fetch();
                while ($row != null) {
                    $cadena .= '<tr><td>' . $row[0] . '</td><td>' . $row[1] . '</td><td>' . $row[2] . '</td></tr>';
                    $row = $buscador->fetch();
                }
                $cadena .= "</table>";
            }
            echo $cadena;


            $dwes->commit();
        } catch (Exception $e) {
            $dwes->rollBack();
            echo 'Excepción capturada: ' .  $e->getMessage() . '"\n"';
        } finally {
            unset($dwes);
        }
    }


    ?>
</body>

</html>