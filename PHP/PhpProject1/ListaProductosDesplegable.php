<html>

<head>
    <title>Lista de Productos</title>
</head>

<body>
    <?php
    $cadenaTextoHtml = "";
    $dwes = new mysqli();   
    //--------------------------IMPORTANTE---------------------------------------------------------------------------------------
    //mi base de datos esta en el puerto 3310 por eso que lo tenga cambiado, hay que acordarse de modificar el puerto de localhost al
    //que sea en el pc donde se utiliza
    //------------------------------------------------------------------------------------------------------------------------------


    //Le pasamos los datos de conexion a traves del metodo connect
    //80 no es necesario, es el puerto pero si no se modifica se cogeria por defecto
    $dwes->connect("localhost:3310", 'root', '', 'dwes');
    //si la conexion ha tenido errores se mostraran en pantalla        
    $error = $dwes->connect_errno;
    if ($error != null) {
        echo "<p> Error $error conectado a la base de datos: $dews";
    } 
    //en caso de que no haya errores se procede a cargar eb la funcion la conexion de la base de datos y la cadena que manejara
    //la pagina web
    else {
        $cadenaTextoHtml = realizarDesplegable($dwes, $cadenaTextoHtml);
    }
    //cuando se envia la informacion se pasara a la funcion de mostrar el stock
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!empty($_POST['nombre_corto'])) {
            $cadenaTextoHtml = mostrarStock($dwes, $cadenaTextoHtml);
        }
    }
    //la siguiente funcion creara el menu desplegable que mostrara en el formulario, recinbira
    //la conexion y la cadena de texto con la que modificaremos el html
    function realizarDesplegable($conexion, $cadena)
    {
        //creamos la consulta de todas la ocurrencias de nombre corto y cod(que usaremos mas adelante)
        $sql = 'SELECT nombre_corto,cod FROM producto';
        //realizamos dixa consulta en la bd almacenando los resultados en una "tabla llamada resultado"
        $resultado = $conexion->query($sql);
        //si la tabla no esta vacia empezaremos creando el desplegable con opciones multiples
        if ($resultado != null) {
            $cadena = '<select name="nombre_corto[]" multiple>';
            //una vez creada la etiqueta de apertura empezamos a recorrer la tabla hasta que no haya mas filas           
            do {
                $row = $resultado->fetch_row();
                //mientras la fila no este vacia crearemos una opcion mas en la que su valor sera el codiga(segunda columna de nuestro select)
                //y mostrara el nombre corto(primera opcion de nuestro select)
                if($row!=null)
                $cadena .= '<option value="' . $row[1] . '">' . $row[0] . '</option><br>';
                
                
            }while ($row != null);
            //una vez completadas todas las ocurrencias cerramos el desplegable y creamos un boton de envio
            $cadena .= "</select>";
            $cadena .= '<hr><input type="submit">';
        }
        return $cadena;
    }
    //la segunda parte para coger los datos del formulario y mostrar el stock de lo solicitado
    function mostrarStock($conexion, $cadena)
    {
        //reiniciamos la cadena que manejara el formulario
        $cadena = "<table><tr><th>Producto</th><th>Unidades en stock</th></tr>";
        //empezamos recorriendo lo que recibamos del formulario metiendolo en la variable selected
        foreach ($_POST['nombre_corto'] as $selected) {
            //creamos la consulta para que una las dos tablas por el codigo y que el producto sea igual a la informacion que hemos recibido del formulario
            $sql = 'SELECT producto.nombre_corto,sum(stock.unidades) FROM producto, stock WHERE (producto.cod=stock.producto) AND (stock.producto="' . $selected . '")';
            //hacemos una consulta por cada informacion recibida y la realizamos
            $resultado = $conexion->query($sql);
            //despues recorremos las tablas creadas(en este caso la consulta solo nos dará una columna por valor, aun asi lo dejo con el while para que me
            //valga para otras consultas)
            $row = $resultado->fetch_row();
            while ($row != null) {
                $cadena .= "<tr><td>" . $row[0] . "</td><td style='text-align: right'>" . $row[1] . " und</td></tr>";
                $row = $resultado->fetch_row();
            }
        }
        //terminado todo se cierra la tabla
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
    <!-- de la siguiente forma se crea una referencia a otra pagina que manejara otro php para hacer un formulario con checkbox-->
    <button onclick="window.location.href='ListaProductos.php'">Ver en Checkbox</button>
</body>

</html>