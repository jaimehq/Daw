<?php

// Función de conexión con la base de datos
function databaseConnect(): PDO
{
    // Variables
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
        return $conexion;
    } catch (PDOException $e) {
        echo "Excepción capturada: ", $e->getMessage(), (int)$e->getCode();
    }
}

function authentication($conexion, $username, $password): bool
{
    // Returns if the authentication was successful
    $sql = 'SELECT username, password FROM autenticacion WHERE username = ? AND password = ?';
    $consulta = $conexion->prepare($sql);
    $consulta->bindParam(1, $username);
    $consulta->bindParam(2, $password);
    $consulta->execute();
    $registrosEncontrados = $consulta->rowCount();
    if ($registrosEncontrados > 0) {
        // El usuario autentica, guardamos username en variable de sesión y redireccionamos
        session_start();
        $_SESSION['username'] = $_POST['username'];
        return true;
    }
    return false;
}

function listKeyValueInSelectOptions($conexion, $table, $colKeyName, $colValueName)
{
    // Returns if the authentication was successful
    $sql = 'SELECT ?, ? FROM ?';
    try {
        $consulta = $conexion->prepare($sql);
        //$consulta->bindParam(1, $colKeyName);
        //$consulta->bindParam(2, $colValueName);
        //$consulta->bindParam(3, $table);
        $consulta->execute([$colKeyName, $colValueName, $table]);
        while ($row = $consulta->fetch())
        {
            echo '<option name="'.$row[0].'" value="'.$row[1].'">'.$row[1].'</option>';
        }
    }
    catch (PDOException $e)
    {
        print $e->getMessage();
    }
}
