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
   /*  Ejercicio 2:
    Confeccionar una clase abstracta llamada Operacion que defina como atributos $valor1, $valor2, $resultado y defina como métodos cargar1 (inicializa el atributo $valor1), cargar2 (inicializa el atributo $valor2) y por último un método que muestre el contenido de $resultado.
    Luego definir dos subclases concretas de la clase Operacion. La primera llamada Suma que tiene por objetivo la carga de dos valores, sumarlos y mostrar el resultado. La segunda llamada Resta que tiene por objetivo la carga de dos valores, restarlos y mostrar el resultado de la diferencia.
     */
    require_once './clases/suma.php';
    $sumita=new Suma(5,4);
    ?>
</body>
</html>