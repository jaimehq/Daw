<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio 4</title>
</head>
<body>
    <?php
    //jaime hernansanz
    try{
    $dwes = new PDO('mysql:host=localhost:3306;dbname=dwes', 'root', '');
    $dwes->beginTransaction();
    //aqui meteria las caracteristicas de la tabla que vienen en el archivo del examen
    $sql="CREATE TABLE valoracion";
    //una vez creada la sentencia se ejecutaria creando la base de datos
    //con las caracteristicas con la sentencia $dwes->exec($sql);
    }catch (Exception $e){
        //aqui capturariamos los errores y hariamos un rollback
    }finally{
        //cerramos la bd
    }
    //una vez creada la tambla con un if($_get y los parametros necesarios en isset) empezariamos
    //a manejar las variables introducidas para insertarlo en la tabla igual que hemos hecho con los anteriores
    //ejercicios pero cambiando las sentencias sql y con un echo mostrariamos que a sido exitoso
    //o que a dado errores
    ?>  
</body>
</html>