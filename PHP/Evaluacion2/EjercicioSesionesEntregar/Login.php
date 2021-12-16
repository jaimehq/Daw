<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogIn</title>
</head>

<body>
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
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $host = 'localhost';
    $db = 'dwes';
    $user = 'root';
    $pass = '';
    $dsn = "mysql:host=$host;dbname=$db";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];
    try {
        $conexion = new PDO($dsn, $user, $pass, $options);
        $sql = 'SELECT username, password FROM autenticacion WHERE username = ? AND password = ?';
        $consulta = $conexion->prepare($sql);
        $consulta->bindParam(1, $_POST['usuario']);
        $consulta->bindParam(2, $_POST['password']);
        $consulta->execute();
        $registrosEncontrados = $consulta->rowCount();
        if ($registrosEncontrados > 0) {
            // El usuario autentica
            echo "<h1>Bienvenido " . $_POST['usuario'] . " !</h1>";
            session_start();
            $_SESSION['usuario']=$_POST['usuario'];
            header('Location: '.'Productos.php');
            die();
        }else{
            echo "onde vas con eso????";
        }
    } catch (PDOException $e) {
        echo "Excepción capturada: ", $e->getMessage(), (int)$e->getCode();
    }
}
?>

</html>