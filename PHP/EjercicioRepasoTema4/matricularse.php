<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matricularse</title>
</head>

<body>
    <?php
    $mensaje = "";
    $opciones = "";
    //esto lo haremos despues de todo para actualizar el desplegable
    $academia = new PDO('mysql:host=localhost:3306;dbname=academia', 'root', '');
    /* 
        $sql= 'SELECT * FROM clases WHERE plazas_libres>0 ';
         $resultado=$academia->query($sql);
        if ($resultado != null) {
            $row = $resultado->fetch();
            while ($row != null) {
                $opciones.='<option value="'.$row['codnivel'].'">'.$row[1].' '.$row[2].' '.$row[3].'</option>';
                $row = $resultado->fetch();
            }
        } */
    $opciones = crearSelect($academia, $opciones);
    function crearSelect($conexion)
    {
        $opciones = "";
        $sql = 'SELECT * FROM clases WHERE plazas_libres>0 ';
        $resultado = $conexion->query($sql);
        if ($resultado != null) {
            $row = $resultado->fetch();
            while ($row != null) {
                $opciones .= '<option value="' . $row['codnivel'] . '">' . $row[1] . ' ' . $row[2] . ' ' . $row[3] . '</option>';
                $row = $resultado->fetch();
            }
        }
        $resultado->closeCursor();
        unset($academia);
        return $opciones;
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $academia = new PDO('mysql:host=localhost:3306;dbname=academia', 'root', '');
        $academia->beginTransaction();
        try {
            $codigoCurso = $_POST["cursoSelect"];
            $cursoConsulta = 'SELECT nivel, dia, hora, plazas_libres FROM clases WHERE codnivel=' . $codigoCurso . '';
            $resultado = $academia->query($cursoConsulta);
            $row = $resultado->fetch();
            $resultado->closeCursor();
            if ($row['plazas_libres'] <= 0) throw "El curso no tiene plazas";
            $campos = array('dni', 'nombre', 'telefono', 'edad', 'nivel', 'dia', 'hora');
            $insertar = $academia->prepare('INSERT INTO alumno (dni,nombre,telefono,edad,nivel,dia,hora) VALUES (?,?,?,?,?,?,?)');

            $insertar->bindParam(1, $_POST['dni']);
            $insertar->bindParam(2, $_POST['nombre']);
            $insertar->bindParam(3, $_POST['telefono']);
            $insertar->bindParam(4, $_POST['edad']);
            $insertar->bindParam(5, $row[0]);
            $insertar->bindParam(6, $row[1]);
            $insertar->bindParam(7, $row[2]);


            if (!$insertar->execute()) throw "No se ha podido insertar el alumno";
            $sqlRestar = 'UPDATE clases SET plazas_libres=plazas_libres-1 WHERE codnivel=' . $codigoCurso;
            if ($academia->exec($sqlRestar) == 0) throw "No se ha podido eliminar la plaza";
            $insertar->closeCursor();
            $academia->commit();
            $mensaje = "OLE OLE TODO A SIDO UN EXITO VAMOS A POR UNA CERVE";
            $opciones = crearSelect($academia);
        } catch (Exception $e) {
            $academia->rollBack();
            $mensaje = 'Excepción capturada: ' .  $e->getMessage() . '"\n"';
        } finally {
            unset($academia);
        }
    }

    ?>

    <h1>Matricula curso</h1>
    <hr>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <table>
            <tr>
                <td>
                    Nombre:
                </td>
                <td>
                    <input name="nombre" type="text" placeholder="Su nombre">
                </td>
            </tr>
            <tr>
                <td>
                    DNI:
                </td>
                <td>
                    <input name="dni" type="text" placeholder="Su DNI" require>
                </td>
            </tr>
            <tr>
                <td>
                    Teléfono:
                </td>
                <td>
                    <input name="telefono" type="tel" placeholder="Su telefono" require>
                </td>
            </tr>
            <tr>
                <td>
                    Edad:
                </td>
                <td>
                    <input name="edad" type="number" placeholder="Su Edad" require>
                </td>
            </tr>
            <tr>
                <td>
                    Nivel:
                </td>
                <td>
                    <select id="cursosDisponibles" name="cursoSelect" require>
                        <option value="">Seleccione el curso que desea</option>
                        <?php
                        echo $opciones
                        ?>
                    </select>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input type="submit" value="Matricularse">
                </td>
            </tr>
        </table>
    </form>
    <hr>
    <button onclick="window.location.href='horarios.php'">Ver Cursos disponibles</button>
    <button onclick="window.location.href='index.php'">Volver a inicio</button>
    <div>
        <?php
        echo $mensaje
        ?>
    </div>
</body>

</html>