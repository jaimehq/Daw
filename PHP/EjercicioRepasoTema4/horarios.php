<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horarios</title>
    <style>
        table{
            border: solid red 3px;
            border-radius: 5px;
            border-collapse: collapse;
        }
        td{
            border: solid black 1px
        }

    </style>
</head>

<body>

    <h1>HORARIOS</h1>
    <?php
    $academia = new PDO('mysql:host=localhost:3310;dbname=academia', 'root', '');
    $cadena = "<table><tr><th>Codigo</th><th>Nivel</th><th>Dia</th><th>Hora</th><th>Plazas disponibles</th></tr>";
    $sql = 'SELECT * FROM clases ';
    $resultado = $academia->query($sql);
    if ($resultado != null) {
        $row = $resultado->fetch();
        while ($row != null) {
            $cadena .= '<tr><td>'.$row[0].'</td><td>'.$row[1].'</td><td>'.$row[2].'</td><td>'.$row[3].'</td><td>'.$row[4].'</td></td>';
            $row = $resultado->fetch();
        }
    }
    $cadena.="</table>";
    $resultado->closeCursor();
    unset($academia);
    echo $cadena;
    ?>

</body>

</html>