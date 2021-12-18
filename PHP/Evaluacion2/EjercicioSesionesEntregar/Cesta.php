<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cesta</title>
</head>
<body>
<?php
    session_start();
    if (!isset($_SESSION['usuario'])) {
        echo '<h1>Usuario no identificado</h1>';
        echo '<h4>Porfavor vaya a la pagina de <a href="Login.php">Login</a> ';
    } else {
        if(isset($_POST['pagar'])){
            header('Location: ' . 'Pagar.php');
        }if(isset($_POST['desconexion'])){
            header('Location: ' . 'Logoff.php');
        }
        echo "Bienvenido " . $_SESSION['usuario'] . '    <a href="Logoff.php">Desconectar</a><hr>';        
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
            <input  name="pagar" type="submit" value="Pagar">
            </form>
            <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST">
            <input type="submit"  name="desconexion" value="Desconectar">
            </form>
        <?php
            echo '</fieldset>';
        }
    }

        ?>
</body>
</html>