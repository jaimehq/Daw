<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <!-- Gestionar la verificación del usuario -->
        <?php
        // Verificar que se ha hecho clic en el botón de login
        if (isset($_POST['username']) && isset($_POST['password'])) {
            // Verificamos
            // Crear conexión a base de datos
            $host = 'localhost';
            $db = 'dwes';
            $user = 'root';
            $pass = '';
            $dsn = "mysql:host=$host;dbname=$db";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_BOTH
            ];
            try {
                $conexion = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                echo "Excepción capturada: ", $e->getMessage(), (int) $e->getCode();
            }
            // Crear consulta preparada para hacer select sobre tabla de usuarios
            $sql = 'SELECT username, password FROM autenticacion WHERE username = ? AND password = ?';
            $consulta = $conexion->prepare($sql);
            $consulta->bindParam(1, $_POST['username']);
            $consulta->bindParam(2, $_POST['password']);
            $consulta->execute();
            $registrosEncontrados = $consulta->rowCount();
            if ($registrosEncontrados > 0) {
                // El usuario autentica, guardamos username en variable de sesión y redireccionamos
                echo "Estás autenticado en el sistema";
                // session_start();
                // $_SESSION['username'] = $_POST['username'];
            }
        }
        ?>

        <!-- Formulario -->
        <form action="<?php $_SERVER['PHP_SELF'] ?>" method="POST">
            Nombre de usuario:
            <input type="text" name="username" />
            <br><br>
            Contraseña:            
            <input type="password" name="password" />
            <button type="submit" value="login">Log in</button>
        </form>

    </body>
</html>

