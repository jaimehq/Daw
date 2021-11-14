<html>

<head>
    <title>Lista de Productos</title>
</head>

<body>
    <?php
    $cadenaTextoHtml = "";
    $dwes = new mysqli();

    //Le pasamos los datos de conexion a traves del metodo connect
    //80 no es necesario, es el puerto pero si no se modifica se cogeria por defecto
    $dwes->connect("localhost:3310", 'root', '', 'dwes');
    //si la conexion ha ido bien, mostramos la info del servidor        
    $error = $dwes->connect_errno;
    if ($error != null) {
        echo "<p> Error $error conectado a la base de datos: $dews";
    } else {
        $cadenaTextoHtml = realizarCheckbox($dwes, $cadenaTextoHtml);
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!empty($_POST['nombre_corto'])) {
            $cadenaTextoHtml = mostrarStock($dwes, $cadenaTextoHtml);
        }
    }

    function realizarCheckbox($conexion, $cadena)
    {
        $sql = 'SELECT nombre_corto,cod FROM producto';
        $resultado = $conexion->query($sql);
        if ($resultado != null) {
            $row = $resultado->fetch_row();
            while ($row != null) {
                $cadena .= '<label><input type="checkbox" name="nombre_corto[]" value="' . $row[1] . '">' . $row[0] . '</label><br>';
                $row = $resultado->fetch_row();
            }
            $cadena .= '<hr><input type="submit">';
        }
        return $cadena;
    }
    //la segunda parte para coger los datos del formulario y mostrar el stock de lo solicitado
    function mostrarStock($conexion, $cadena)
    {
        $cadena = "<table><tr><th>Producto</th><th>Unidades en stock</th></tr>";
        foreach ($_POST['nombre_corto'] as $selected) {
            $sql = 'SELECT producto.nombre_corto,sum(stock.unidades) FROM producto, stock WHERE (producto.cod=stock.producto) AND (stock.producto="' . $selected . '")';
            $resultado = $conexion->query($sql);
            $row = $resultado->fetch_row();
            while ($row != null) {
                $cadena .= "<tr><td>" . $row[0] . "</td><td style='text-align: right'>" . $row[1] . " und</td></tr>";
                $row = $resultado->fetch_row();
            }
        }

        $cadena .= "</table>";
        return $cadena;
    }
    ?>
    <fieldset>
        <leyend>Productos</legend>
            <form action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?> method="POST">
                <?php
                echo $cadenaTextoHtml;
                ?>
            </form>
    </fieldset>
    <button onclick="window.location.href='ListaProductosDesplegable.php'">Ver en Desplegable</button>
    <button onclick="window.location.href='SeleccionarTienda.php'">Ver tiendas</button>
</body>

</html>