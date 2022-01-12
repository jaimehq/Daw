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
//en el caso de que se envie el formulario se recoge en la misma pagina para comprobar la validez de los datos:
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //se crean las variables para la conexion a la BD
    $host = 'localhost';
    $db = 'dwes';
    $user = 'root';
    $pass = '';
    $dsn = "mysql:host=$host;dbname=$db";
    //Camnbiamos las opciones de los errores
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];
    try {
        //creamos la conexion y comprobamos que exista algun registro con el mismo usuario y contraseña
        $conexion = new PDO($dsn, $user, $pass, $options);
        $sql = 'SELECT username, password FROM autenticacion WHERE username = ? AND password = ?';
        $consulta = $conexion->prepare($sql);
        $consulta->bindParam(1, $_POST['usuario']);
        $consulta->bindParam(2, $_POST['password']);
        $consulta->execute();
        $registrosEncontrados = $consulta->rowCount();
        if ($registrosEncontrados > 0) {
            // En caso de que el usuario consiga registrarse iniciamos sesion, asignamos el usuario a la variable sesion            
            session_start();
            $_SESSION['usuario']=$_POST['usuario'];
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