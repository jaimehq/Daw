<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    echo '<h1>Usuario no identificado</h1>';
    echo '<h4>Porfavor vaya a la pagina de <a href="Login.php">Login</a> ';}
else{
    unset ($_SESSION['cesta']);
    echo '<h1>La compra esta finalizada</h1>';
    echo '<h4>¿Desea seguir comprando? <a href="Productos.php">SI</a> <a href="Logoff.php">NO</a></h4> ';
}

?>