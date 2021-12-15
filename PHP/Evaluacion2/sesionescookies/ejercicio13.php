<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sesiones</title>
</head>

<body>
    <?php
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        session_start();
        session_unset();
        $_SESSION['autenticado'] = 'false';
    } 
    if(!isset($_SESSION['autenticado'])){
    if (!isset($_SERVER['PHP_AUTH_USER'])){
        while($_SESSION['autenticado']!=true){
        header('WWW-Authenticate: Basic');
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
        if ($registrosEncontrados > 0) {
            // El usuario autentica
            $_SESSION['autenticado']=true;
        }else{
            header('WWW-Authenticate: Basic');
        }
    }}
    } 
    
    if(session_start()){
    //contador de visitas
     if (isset($_SESSION['visitas'])) {
        $_SESSION['visitas']++;
    } else {
        $_SESSION['visitas'] = 0;
    }

    }



    //en cada visita añadimos un valor al array
    $_SESSION['misvisitas'][] = array(time(), $_SESSION['visitas']);
    foreach ($_SESSION['misvisitas'] as $visita) {
        echo 'Visita nº: ' . $visita[1] . ' se realizo a las :';
        echo date("d/m/y \a \l\a\s H:i:s", $visita[0]) . "<br>";
    } 

    
    
    ?>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

<input type="submit">

</form>
</body>

</html>