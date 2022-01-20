<html>
    <head>
        <title>Ejercicio stock</title>
        <link href="dwes.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <?php
            // Incorporo las variables de acceso a la BD
            require ("datos_acceso.php");
        ?>  
        <div id="encabezado">
            <h1>Ejercicio: Stock de productos con actualización</h1>
            
            <!-- Creo un formulario para listar los productos disponibles -->
            <form id="form_seleccion" action="ejercicioStockUpdate.php") method="post">
                <span>Producto: </span> <!-- label -->
                <select name="producto[]" multiple> <!-- listado de productos con selección múltiple -->
                <?php
                    // Si ya he enviado el formulario de selección (se ha seteado la clave "producto" de $_POST,
                    // guardo esa info en la variable $producto
                    if (isset($_POST['producto'])) $producto=$_POST['producto'];
                    // Conectamos a la base de datos para recuperar la lista de productos para este select
                    $dwes = new mysqli($host, $user, $pass, $db);
                    $error = $dwes->connect_errno;
                    if($error == null){ // Si no ha habido error de conexión a la BD
                        // Generamos la query de relleno del select
                        $sql = "SELECT cod, nombre_corto FROM producto";
                        // La lanzamos
                        $resultado = $dwes->query($sql);
                        // Si la query devuelve resultados
                        if($resultado){
                            // Recuperamos el primer registro del result-set
                            $row = $resultado->fetch_assoc();
                            // Mientras no hayamos recuperado todos los registros
                            while ($row != null){
                                // Coloco un nuevo producto en el select tomando el código de producto como value
                                echo "<option value='${row['cod']}'";
                                // Si el producto se ha seleccionado (para cuando ya he mandado el formulario)
                                if(isset($producto) && ($producto==$row['cod']))
                                    // Lo marco como seleccionado en el select
                                    echo " selected='true'";
                                // El nombre del producto es lo que muestra el select
                                echo">${row['nombre_corto']}</option>";
                                // Recupero el siguiente registro
                                $row = $resultado->fetch_assoc();
                            }
                        }
                    }
                    else    // Si ha habido error de conexión a la BD
                    {
                        // Guardo la descripción del mensaje de error
                        $mensaje = $dwes->connect_error;
                    }
                ?>
                <!-- Cierro el select y coloco el botón de envío del formulario -->
                </select>
                <input type="submit" value="Mostrar stock" name="enviar"/>
            </form>
        </div>
        
        <div id="contenido">
            <h2>Stock del producto en las tiendas:</h2>
            <?php
                // Si no hemos tenido error de conexión a la BD y ya hemos
                // recibido el listado de productos seleccionados
                if (($error==null) && (isset($producto)))
                {
                    // Contamos los productos seleccionados por el usuario
                    $numProductos = count($producto);
                    // Abro el formulario
                    echo "<form id=\"form_update\" action=\"ejercicioStockUpdate.php\" method=\"post\">";
                    // Creamos la tabla con el stock de cada producto por tienda
                    // añadiendo un campo para actualizar el stock
                    echo "<table border=1>";
                    echo "<tr><th>Producto</th><th>Tienda</th><th>Stock</th><th>Nuevo stock</th></tr>";
                    // Para cada uno de los productos...
                    for ($i=0; $i<$numProductos; $i++) {
                        // Creo consulta para recuperar stock de un producto en cada tienda
                        $sql="SELECT tienda.nombre, tienda.cod, producto.nombre_corto, stock.unidades FROM tienda INNER JOIN stock ON tienda.cod=stock.tienda INNER JOIN producto ON stock.producto = producto.cod WHERE stock.producto='$producto[$i]'";
                        // Lanzo consulta
                        $resultado = $dwes->query($sql);
                        // Si tiene resultados, los recupero y muestro en la tabla
                        if ($resultado){
                            $row = $resultado->fetch_assoc();
                            while ($row != null){
                                echo "<tr><td>${row['nombre_corto']}</td><td>${row['nombre']}</td><td>${row['unidades']}</td>";
                                echo "<td><input type=\"number\" name=\"".$producto[$i]."#".$row['cod']."\"/></td></tr>";
                                $row = $resultado->fetch_assoc();
                            }
                        }
                        $resultado->close();
                    }
                    // Cierro la tabla
                    echo "</table>";
                    // Habiendo rellenado todas las filas, meto botón de envío de actualizaciones
                    echo "<input type=\"submit\" value=\"Actualizar stock\" name=\"update\"/>";
                    echo "</form>";
                } elseif (($error==null) && (isset($_POST)) && (!isset($_POST["producto"]))) {
                    //Genero la consulta calculada
                    $consulta = $dwes->stmt_init();
                    if ($consulta -> prepare("UPDATE stock SET unidades = (?) WHERE producto = (?) AND tienda = (?)")) {
                        foreach (array_keys($_POST) as $key => $value) {
                            if ($value != "update") {
                                $param1 = (int)$_POST[$value];
                                $explodedValue = explode("#",$value);
                                $param2 = $explodedValue[0];
                                $param3 = (int)$explodedValue[1];
                                if ($consulta -> bind_param('dsd', $param1, $param2, $param3)) {
                                    // La asociación de parámetros ha sido exitosa
                                    if (!$consulta -> execute()) {
                                        echo "consulta con producto: ".$param2." de tienda: ".$param3." no se ha ejecutado<br>";
                                    }
                                } else {
                                    $mensaje = "bind_param ha fallado";
                                }
                            }
                        }
                    } else {
                        $mensaje = "Error al preparar la consulta";
                    }
                    // Cuando he acabado, cierro la consulta
                    $consulta->close();
                }
            ?>
        </div>
        <div id="pie">
            <?php
                // Si se produjo algu?n error se muestra en el pie
                if ($error!=null)
                    echo "<p>Se ha producido un error! $mensaje</p>";
                else
                {
                    $dwes->close();
                }
                unset($dwes);
            ?>
        </div>
    </body>
</html>

