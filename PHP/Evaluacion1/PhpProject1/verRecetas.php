<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EjercicioRecetas2</title>
</head>
<body>
    <?php
    $cadenaTexto="";
    $wic= new PDO('mysql:host=localhost;dbname=prewic', 'root','');
    $sql= 'SELECT * FROM recetas';
    $resultado=$wic->query($sql);
    $cadenaTexto="<table style=\"width:100%\", border:><tr><th>ID</th><th>Nombre</th><th>Tiempo</th><th>Dificultad</th><th>Comensales</th><th>Ingredientes</th><th>Pasos</th><th>URL</th></tr>";
    if ($resultado != null) {
        $row = $resultado->fetch();
        while ($row != null) {
            $ingredientes=separarIngredientes($row[6]);
            $cadenaTexto .= '<tr><td>' . $row[0] . '</td><td>'. $row[1] . '</td><td>'. $row[2] . '</td><td>'. $row[3] . '</td><td>'. $row[4] . '</td><td>'. $row[5] . '</td><td>';
            //cuando se metan igredientes funcionara separandolos
            /* foreach ($row[6] as $dato) {
                $cadenaTexto.="<p>$dato</p>";
            } */ 
            $cadenaTexto.=$row[6];
             $cadenaTexto .='</td><td>'. $row[7] . '</td></tr>';
            $row = $resultado->fetch();
        }
        $cadenaTexto .= '</table>';
        unset($wic);        
    }
    //nos separara los pasos
    function separarPasos($texto){
        $arrayPasos=explode('#',$texto);
        return $arrayPasos;
    }
    //nos separara los ingredientes cuando este
    function separarIngredientes($texto){
        $arrayIngredientes=explode(';',$texto);
        return $arrayIngredientes;

    }

    ?>

    <?php
        echo $cadenaTexto;

    ?>
    <br><button onclick="window.location.href='EjercicioRecetas1.php'">Ir a agregar recetas</button>
</body>
</html>