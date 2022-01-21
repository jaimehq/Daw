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
    require_once './clases/Gerente.php';
        $emp1=new Empleado('pepe',80);
        $emp2=new Empleado('pepe1',90);
        $emp3=new Empleado('pepe2',100);
        $emp4=new Empleado('pepe3',120);
        $emp5=new Empleado('pepe4',140);
        $gerente1=new Gerente('julian',2000);
        $emp3->imprimirDatos();
        $gerente1->imprimirDatos();
    ?>
</body>
</html>