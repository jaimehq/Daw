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
        require_once 'claseProducto.php';
        $p= new Producto('samsung', 'verde');
        $p->muestra();
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
        }
    ?>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">


    </form>
</body>
</html>