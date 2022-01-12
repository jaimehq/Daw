<?php
//iniciamos la sesion y en caso de que no exista usuario(se ha entrado directamente) mostraremos un mensaje que se vaya a logear
session_start();
if (!isset($_SESSION['usuario'])) {
    echo '<h1>Usuario no identificado</h1>';
    echo '<h4>Porfavor vaya a la pagina de <a href="Login.php">Login</a> ';}
else{
    //en caso de que si exista destruimos la informacion de la sesision y redirigimos a la pagina de login
    session_destroy();
    header('Location: ' . 'Login.php');
}

?>