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
        header('Location: ' . 'Login.php');
        die();
    } else {
        echo "Bienvenido " . $_SESSION['usuario'] . '    <a href="Logoff.php">Desconectar</a><hr>';


        $cadena = "";
        $dwes = new PDO('mysql:host=localhost;dbname=dwes', 'root', '');
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
                if(!isset($_SESSION['cesta'])) 
                    $_SESSION['cesta']=[];    
                $agregar=[];
                foreach($_POST['producto'] as $productoSeleccionado){
                    $buscador2=$dwes->prepare('SELECT nombre_corto, pvp FROM producto WHERE cod="'.$productoSeleccionado.'"');
                    $buscador2->execute();
                    $row2=$buscador2->fetch();
                    if($row2!=null){
                    $paMeter=array( 'nombre'=>$row2[0],'pvp'=>$row2[1], 'unidades'=>1);  
                    array_push($_SESSION['cesta'], $paMeter);
                }
            }
            }
        }
        if (isset($_SESSION['cesta'])) {
            echo '<fieldset><legend>Cesta de la compra</legend>';
            $tablita = "<table><tr><th>Producto</th><th>Precio</th><th>Unidades</th></tr>";
            foreach ($_SESSION['cesta'] as $linea) {
                $tablita .= '<tr><th>'.$linea["nombre"].'</th><th>'.$linea["pvp"].'</th><th>'.$linea["unidades"].'</th></tr>';
            }
            $tablita .= '</table>';
            echo $tablita;
            echo '</fieldset>';
        }
    }

    ?>
</body>

</html>