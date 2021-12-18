<?php
//iniciamos sesion y en caso de que se haya llegado aqui sin logear se mostrara un mensaje de que vaya a logearse
session_start();
if (!isset($_SESSION['usuario'])) {
    echo '<h1>Usuario no identificado</h1>';
    echo '<h4>Porfavor vaya a la pagina de <a href="Login.php">Login</a> ';}
else{
    //en el caso contrario se borra la cesta y se muestra un mensaje de que la compra se ha finalizado
    unset ($_SESSION['cesta']);
    echo '<h1>La compra esta finalizada</h1>';
    //dando la opcion de desconectarse o volver a la pagina de producto
    echo '<h4>¿Desea seguir comprando? <a href="Productos.php">SI</a> <a href="Logoff.php">NO</a></h4> ';
}

?>