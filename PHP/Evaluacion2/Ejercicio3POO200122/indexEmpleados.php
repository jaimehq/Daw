<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    require_once './clases/Empleado.php';
    $emp=new Empleado('Jaime',18,2000);
    $emp->imprimirDatos();
    echo '<br>';
    echo $emp->devolverSueldo();
    ?>
</body>
</html>