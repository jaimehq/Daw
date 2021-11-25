<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Examen de PHP del 25 de noviembre</title>
</head>

<body>
    <?php
    //jaime hernansanz
    $mensajeError="";
    $cadena = "";
    $contador=0;
    if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['buscar'])) {
        try{
        $dwes = new PDO('mysql:host=localhost:3306;dbname=dwes', 'root', '');
        $buscador = $dwes->prepare('SELECT * FROM producto WHERE nombre_corto LIKE (?)');
        $compara="%". $_GET['buscar']."%";
        $buscador->bindParam(1,$compara);               
        $cadena = "<table><tr><th>Codigo</th><th>Descripcion</th><th>Familia</th><th>nombre_corto</th><th>PVP</th></tr>";
        if ($buscador->execute()) {
            $row = $buscador->fetch();
            
            while ($row != null) { 
            $contador++;         
            $cadena .= '<tr><td>' . $row['cod'] . '</td><td>' . $row['descripcion'] . '</td><td>' . $row['familia'] . '</td><td>' . $row['nombre_corto'] . '</td><td>' . $row['PVP'] . '</td></tr>';
            $row = $buscador->fetch();
        }
        $cadena .= "</table>";
    }
    }catch (Exception $e) {        
        $mensajeError = 'Excepción capturada: ' .  $e->getMessage() . '"\n"';
    } finally {
        unset($dwes);
    }
}
    ?>
    <fieldset>
        <legend>Buscador</legend>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="GET">
            <input type="text" name="buscar">
            <input type="submit">
        </form>
    </fieldset>
    <?php
    
    echo $cadena;
    if($contador>0)
        echo '<h2>La busqueda a encontrado '.$contador.' resultados</h2>';
    echo $mensajeError;
    
    ?>
</body>

</html>