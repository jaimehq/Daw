<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    echo '<h1>Usuario no identificado</h1>';
    echo '<h4>Porfavor vaya a la pagina de <a href="Login.php">Login</a> ';}
else{
    session_destroy();
    header('Location: ' . 'Login.php');
}

?>