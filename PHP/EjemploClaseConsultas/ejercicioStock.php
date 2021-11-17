<html>
    <head>
        <title>Ejercicio stock</title>
        <link href="dwes.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <?php
            require ("datos_acceso.php");
            function actualizarDatos(){
                if (isset($_POST['producto'])) $producto=$_POST['producto'];
                    // Conectamos a la base de datos
                    $dwes = new mysqli('localhost', 'root', '', 'dwes');
                    $error = $dwes->connect_errno;
                if (($error==null) && (isset($producto)))
                {
                    // Contamos los productos seleccionados por el usuario
                    $numProductos = count($producto);
                    // Creamos la tabla
                    echo "<table border=1>";
                    echo "<tr><th>Producto</th><th>Tienda</th><th>Stock</th></tr>";
                    // Recuperar stock de los productos seleccionados
                    for ($i=0; $i<$numProductos; $i++) {
                        // Creo consulta para recuperar stock de un producto
                        $sql="SELECT tienda.nombre, producto.nombre_corto, stock.unidades FROM tienda INNER JOIN stock ON tienda.cod=stock.tienda INNER JOIN producto ON stock.producto = producto.cod WHERE stock.producto='$producto[$i]'";
                        // Lanzo consulta
                        $resultado = $dwes->query($sql);
                        // Si tiene resultados, los recupero y muestro en la tabla
                        if ($resultado){
                            $row = $resultado->fetch_assoc();
                            while ($row != null){
                                echo '<tr><td>'.$row["nombre_corto"].'</td><td>'.$row["nombre"].'</td><td>'.$row["unidades"].'</td><td><input name="'.$row["nombre"].'-'.$row["nombre_corto"].'" type="number"></td></tr>';
                                $row = $resultado->fetch_assoc();
                            }
                        }
                        $resultado->close();
                    }
                    echo "</table>";
                    echo '<input type="submit" value="Actualizar stock" name="Actualizar"/>';
                }
            }

        ?>  
        <div id="encabezado">
            <h1>Ejercicio: Stock de productos</h1> 
            <form id="form_seleccion" action="ejercicioStock.php" method="post" name="formulario1">
                <span>Producto: </span>
                <select name="producto[]" multiple>
                <?php
                    if (isset($_POST['producto'])) $producto=$_POST['producto'];
                    // Conectamos a la base de datos
                    $dwes = new mysqli($host, $user, $pass, $db);
                    $error = $dwes->connect_errno;
                    if($error == null){
                        // Generamos la query de relleno del select
                        $sql = "SELECT cod, nombre_corto FROM producto";
                        $resultado = $dwes->query($sql);
                        if($resultado){
                            $row = $resultado->fetch_assoc();
                            while ($row != null){
                                echo "<option value='${row['cod']}'";
                                if(isset($producto) && ($producto==$row['cod']))
                                    echo " selected='true'";
                                echo">${row['nombre_corto']}</option>";
                                $row = $resultado->fetch_assoc();
                            }
                        }
                    }
                    else
                    {
                        $mensaje = $dwes->connect_error;
                    }
                ?>
                </select>
                <input type="submit" value="Mostrar stock" name="enviar"/>
            </form>
        </div>
        
        <div id="contenido">
            <h2>Stock del producto en las tiendas:</h2>
            <form action="ejercicioStock.php" name="formulario2">
            <?php
                if (($error==null) && (isset($producto)))
                {
                    // Contamos los productos seleccionados por el usuario
                    $numProductos = count($producto);
                    // Creamos la tabla
                    echo "<table border=1>";
                    echo "<tr><th>Producto</th><th>Tienda</th><th>Stock</th></tr>";
                    // Recuperar stock de los productos seleccionados
                    for ($i=0; $i<$numProductos; $i++) {
                        // Creo consulta para recuperar stock de un producto
                        $sql="SELECT tienda.nombre, producto.nombre_corto, stock.unidades FROM tienda INNER JOIN stock ON tienda.cod=stock.tienda INNER JOIN producto ON stock.producto = producto.cod WHERE stock.producto='$producto[$i]'";
                        // Lanzo consulta
                        $resultado = $dwes->query($sql);
                        // Si tiene resultados, los recupero y muestro en la tabla
                        if ($resultado){
                            $row = $resultado->fetch_assoc();
                            while ($row != null){
                                echo '<tr><td>'.$row["nombre_corto"].'</td><td>'.$row["nombre"].'</td><td>'.$row["unidades"].'</td><td><input name="'.$row["nombre"].'-'.$row["nombre_corto"].'" type="number"></td></tr>';
                                $row = $resultado->fetch_assoc();
                            }
                        }
                        $resultado->close();
                    }
                    echo "</table>";
                    echo '<input type="submit" value="Actualizar stock" name="Actualizar"/>';
                }
                
            ?>
            
            </form>
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

