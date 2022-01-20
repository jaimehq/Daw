<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio Recetas 1</title>
</head>
<body>
    <?php
    $mensaje="";
    $wic= new PDO('mysql:host=localhost;dbname=prewic', 'root','');
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $insertar=$wic->prepare('INSERT INTO recetas (nom_receta, tiempo, dificultad, comensales, lista_ingredientes, pasos, pag_receta) VALUES (?,?,?,?,?,?,?)');
        $insertar->bindParam(1,$_POST['nombre']);
        $insertar->bindParam(2,$_POST['tiempo']);
        $insertar->bindParam(3,$_POST['dificultad']);
        $insertar->bindParam(4,$_POST['comensales']);
        $insertar->bindParam(5,$_POST['ingredientes']);
        $insertar->bindParam(6,$_POST['pasos']);
        $insertar->bindParam(7,$_POST['url']);
        if($insertar->execute()){
            $mensaje="<hr>Ole ole que sa metio bien";
        }
        /* $indice=0;
        foreach ($_POST['datos'] as $dato) {
            $insertar->bindParam($indice,$dato);
            $indice++;
            echo $dato;
        } */

    }
    ?>
    <form action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?> method="POST" >
    <table>
        <tr><td>Nombre de la receta:</td><td><input type="text" name="nombre"> </td><br></tr>
        <tr><td>Tiempo:</td><td><input type="number" name="tiempo"> </td><br></tr>
        <tr><td>Dificultad:</td><td><input type="number" name="dificultad"> </td><br></tr>
        <tr><td>Comensales:</td><td><input type="number" name="comensales"> </td><br></tr>
        <tr><td>Ingredientes:</td><td><textarea name="ingredientes"> </textarea></td><br></tr>
        <tr><td>Pasos:</td><td><textarea name="pasos"> </textarea></td><br></tr>
        <tr><td>Url:</td><td><input type="url" name="url"> </td></tr>
        </table>
        <hr>
        <input type="submit" value="Agregar">
    </form>
    <br><button onclick="window.location.href='verRecetas.php'">Ver recetas disponibles</button>
    <div>
        <?php
        echo $mensaje;
        ?>
    </div>
</body>
</html>