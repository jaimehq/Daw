<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
</head>

<body>
    <?php
    session_start();
    if (!isset($_SESSION['usuario'])) {
        echo '<h1>Usuario no identificado</h1>';
        echo '<h4>Porfavor vaya a la pagina de <a href="Login.php">Login</a> ';
    } else {
        if(isset($_POST['vaciar'])){
            $_SESSION['cesta']=[];
        }if(isset($_POST['comprar'])){
            header('Location: ' . 'Cesta.php');
        }


        echo "Bienvenido " . $_SESSION['usuario'] . '    <a href="Logoff.php">Desconectar</a><hr>';


        $cadena = "";
        $dwes = new PDO('mysql:host=localhost:3310;dbname=dwes', 'root', '');
        $buscador = $dwes->prepare('SELECT nombre_corto, pvp,cod FROM producto ');
        if ($buscador->execute()) {
    ?>
            <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST">
        <?php

            $cadena = "<table><tr><th>Producto</th><th>Precio</th><th>Añadir</th></tr>";
            $row = $buscador->fetch();
            while ($row != null) {
                $cadena .= '<tr><td>' . $row[0] . '</td><td>' . $row[1] . '</td><td><input type="checkbox" name="producto[]" value="' . $row[2] . '"></td></tr>';
                $row = $buscador->fetch();
            }
            $cadena .= "</table>";
            echo $cadena;
            echo '<input type="submit" value="Agregar Productos a la cesta"></form>';
        }
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (!empty($_POST['producto'])) {
                if (!isset($_SESSION['cesta']))
                    $_SESSION['cesta'] = [];
                $agregar = [];
                $agregado = false;
                foreach ($_POST['producto'] as $productoSeleccionado) {
                    $buscador2 = $dwes->prepare('SELECT nombre_corto, pvp FROM producto WHERE cod="' . $productoSeleccionado . '"');
                    $buscador2->execute();
                    $row2 = $buscador2->fetch();
                    if ($row2 != null) {
                        $paMeter = array('nombre' => $row2[0], 'pvp' => $row2[1], 'unidades' => 1);
                        $agregado=false;
                        for ($i = 0; $i < count($_SESSION['cesta']); $i++) {
                            if ($paMeter['nombre'] === $_SESSION['cesta'][$i]['nombre']) {
                                $_SESSION['cesta'][$i]['unidades']++;
                                $agregado = true;
                            }
                        }
                        if ($agregado === false) {
                            array_push($_SESSION['cesta'], $paMeter);
                        }
                    }
                }
            }
        }
        if (isset($_SESSION['cesta'])&& $_SESSION['cesta']!=[]) {
            $totalCesta=0;
            echo '<fieldset><legend>Cesta de la compra</legend>';
            $tablita = "<table><tr><th>Producto</th><th>Precio</th><th>Unidades</th></tr>";
            foreach ($_SESSION['cesta'] as $linea) {                
                $precio3=(double)$linea['pvp'];
                $tablita .= '<tr><td>' . $linea["nombre"] . '</td><td>' . $linea["pvp"] . '</td><td>' . $linea["unidades"] . '</td></tr>';
                $totalCesta=$totalCesta+$precio3*$linea["unidades"];
            }
            $tablita.='<tr><td style="border:solid black 1px">TOTAL</td><td style="border:solid black 1px" colspan="2">' . $totalCesta . ' €</td></tr>';
            $tablita .= '</table>';
            echo $tablita;
            ?>
            <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST">
            <input  name="comprar" type="submit" value="Comprar">
            </form>
            <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST">
            <input type="submit"  name="vaciar" value="Vaciar cesta">
            </form>
        <?php
            echo '</fieldset>';
        }
    }

        ?>
</body>

</html>