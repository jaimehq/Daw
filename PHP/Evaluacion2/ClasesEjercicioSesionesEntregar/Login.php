<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogIn</title>
</head>
<body>
    <!-- Creamos el fomulario de inicio de sesion en html -->
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
        <fieldset>
            <table>
                <legend>Usuario:</legend>
                <tr>
                    <td>Usuario:</td>
                    <td><input type="text" name="usuario"></td>
                </tr>
                <tr>
                    <td>Contraseña: </td>
                    <td><input type="password" name="password"></td>
                </tr>
            </table>
            <input type="submit" value="LogIn">
    </form>
    </fieldset>
</body>
<?php
require_once './include/claseBD.php';
//en el caso de que se envie el formulario se recoge en la misma pagina para comprobar la validez de los datos:
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        //creamos la conexion y comprobamos que exista algun registro con el mismo usuario y contraseña
        $bd=new BD();
        $bd->conexionBD();
        $usuarioValido=$bd->comprobarUsuario($_POST['usuario'],$_POST['password']);
        
        if ($usuarioValido) {
            // En caso de que el usuario consiga registrarse iniciamos sesion, asignamos el usuario a la variable sesion            
            session_start();
            $_SESSION['usuario']=$usuarioValido;
            //y cambiamos de pagina
            header('Location: '.'Productos.php');
            die();
        }else{
            //en el caso contrario mostramos un pequeño mensaje de error para que vuelva a intentarlo
            echo "onde vas con eso????<br>Mete bien el usuario y la contraseña porfavor";
        }
    } catch (PDOException $e) {
        echo "Excepción capturada: ", $e->getMessage(), (int)$e->getCode();
    }
}
?>

</html>