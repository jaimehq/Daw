<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autenticacion</title>
</head>
<body>
<?php
            // Recoger el usuario y la contraseña
            if (!isset($_SERVER['PHP_AUTH_USER']))
            {
                header('HTTP/1.1 401 Unauthorized');
                header('WWW-Authenticate: Basic Realm="Contenido restringido"');
            }
            
            // Conectar con la base de datos (tabla autenticacion)
            //  Variables base datos
            $host = 'localhost:3310';
            $db = 'dwes';
            $user = 'root';
            $pass = '';
            $dsn = "mysql:host=$host;dbname=$db";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ];
            try 
            {
                $conexion = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                echo "Excepción capturada: ", $e->getMessage(), (int)$e->getCode();
            }
        
            // Comprobar que el usuario y contraseña son correctos y mostrar
            // contenido página
            $sql = 'SELECT username, password FROM autenticacion WHERE username = ? AND password = ?';
            $consulta = $conexion->prepare($sql);
            $consulta->bindParam(1, $_SERVER['PHP_AUTH_USER']);
            $consulta->bindParam(2, $_SERVER['PHP_AUTH_PW']);
            $consulta->execute();
            $registrosEncontrados = $consulta->rowCount();
            if ($registrosEncontrados > 0)
            {
                // El usuario autentica
                echo "<h1>Bienvenido ".$_SERVER['PHP_AUTH_USER']." !</h1>";
            }
        ?>
</body>
</html>