<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
</head>

<body>
    <?php
    require_once './include/claseBD.php';
    require_once './include/claseProducto.php';
    //lo primero iniciamos la sesion
    session_start();
    //si no existe la variable usuario quiere decir que no se a llegado a identificar, con lo que mostraremos un mensaje
    //para que el usuario se identifique volviendo a la pagina de login
    if (!isset($_SESSION['usuario'])) {
        echo '<h1>Usuario no identificado</h1>';
        echo '<h4>Porfavor vaya a la pagina de <a href="Login.php">Login</a> ';
    } else {
        //en el caso de que se pulse el voton de vaciar la cesta la vaciamos
        if (isset($_POST['vaciar'])) {
            unset($_SESSION['cesta']);
            //en el caso de que se pulse comprar iremos a la pagina correspondiente
        }
        if (isset($_POST['comprar'])) {
            header('Location: ' . 'Cesta.php');
        }

        //lo primero que se mostrara en pantalla es un mensaje con la sesision y un link de desconexion
        echo "Bienvenido " . $_SESSION['usuario'] . '    <a href="Logoff.php">Desconectar</a><hr>';
        //conectamos con la BD
        $bd = new BD();
        $bd->conexionBD();
        $arrayProductos = $bd->ObtienerProductos();
        if ($arrayProductos) {
             ?>
            <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST">
                <?php
                $cadena = "<table><tr><th>Producto</th><th>Precio</th><th>Añadir</th></tr>";
                foreach ($arrayProductos as $producto) {

                    $cadena .= '<tr><td>' . $producto[0] . '</td><td>' . $producto[1] . '</td><td><input type="checkbox" name="producto[]" value="' . $producto[2] . '"></td></tr>';
                }
                $cadena .= "</table>";
                echo $cadena;
                echo '<input name="agregar" type="submit" value="Agregar Productos a la cesta"></form>';
            }
            //cuando se pulsa el boton agregar 
            if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['agregar'])) {
                //comprobamos que haya algun producto seleccionado
                if (!empty($_POST['producto'])) {
                    $arrayCesta=[];
                    //si la cesta no existe la creamos
                    if (!isset($_SESSION['cesta'])){
                        $_SESSION['cesta'] = [];                        
                    }
                    //recorremos el array de productos  para obtener su precio y nombre a partir del codigo que tenemos almacenado    
                    foreach ($_POST['producto'] as $productoSeleccionado) {
                        foreach($arrayProductos as $producto){
                            if($producto[2]==$productoSeleccionado)
                                array_push($arrayCesta,$producto);
                        }
                    }
                    $arrayObjetosProductos=[];
                    foreach($arrayCesta as $productoArray){
                        $objProducto=new Producto($productoArray);
                        array_push($arrayObjetosProductos,$objProducto);
                    } 
                    foreach($arrayObjetosProductos as $objetoProducto){
                        //metemos la informacion en un array
                        $paMeter = array('nombre' => $objetoProducto->cod, 'pvp' => $objetoProducto->pvp, 'unidades' => 1);
                        //creamos una variable para saber si esta o no en el array cesta
                        $agregado = false;
                        //recorremos el array de sesion para ver si el producto ya esta en el
                        for ($i = 0; $i < count($_SESSION['cesta']); $i++) {
                            if ($paMeter['nombre'] === $_SESSION['cesta'][$i]['nombre']) {
                                //si esta en modificamos la cantidad
                                $_SESSION['cesta'][$i]['unidades']++;
                                //y la variable agregado la marcamos a true
                                $agregado = true;
                            }
                        }
                        //en caso de que no haya articulo en el array le agregamos
                        if ($agregado === false) {
                            array_push($_SESSION['cesta'], $paMeter);
                        }
                    }
                        
                      
                        /* if ($row2 != null) {
                            //metemos la informacion en un array
                            $paMeter = array('nombre' => $row2[0], 'pvp' => $row2[1], 'unidades' => 1);
                            //creamos una variable para saber si esta o no en el array cesta
                            $agregado = false;
                            //recorremos el array de sesion para ver si el producto ya esta en el
                            for ($i = 0; $i < count($_SESSION['cesta']); $i++) {
                                if ($paMeter['nombre'] === $_SESSION['cesta'][$i]['nombre']) {
                                    //si esta en modificamos la cantidad
                                    $_SESSION['cesta'][$i]['unidades']++;
                                    //y la variable agregado la marcamos a true
                                    $agregado = true;
                                }
                            }
                            //en caso de que no haya articulo en el array le agregamos
                            if ($agregado === false) {
                                array_push($_SESSION['cesta'], $paMeter);
                            }
                        } */
                    }
                }
            }
            //cuando esista la variable cesta y sea distinta a un array vacio creamos un fieldste con la info
            if (isset($_SESSION['cesta']) && $_SESSION['cesta'] != []) {
                //asignamos una variable del total
                $totalCesta = 0;
                echo '<fieldset><legend>Cesta de la compra</legend>';
                $tablita = "<table><tr><th>Producto</th><th>Precio</th><th>Unidades</th></tr>";
                //y recorremos el array para imprimir lo que tenga dentro a la vez que vamos calculando el total
                foreach ($_SESSION['cesta'] as $linea) {
                    $precio3 = (float)$linea['pvp'];
                    $tablita .= '<tr><td>' . $linea["nombre"] . '</td><td>' . $linea["pvp"] . '</td><td>' . $linea["unidades"] . '</td></tr>';
                    $totalCesta = $totalCesta + $precio3 * $linea["unidades"];
                }
                $tablita .= '<tr><td style="border:solid black 1px">TOTAL</td><td style="border:solid black 1px" colspan="2">' . $totalCesta . ' €</td></tr>';
                $tablita .= '</table>';
                //imprimimos la tabla
                echo $tablita;
                //y por ultimo creamos los dos botones en dos formularios para vaciar y comprar los productos
                ?>

                <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST">
                    <input name="comprar" type="submit" value="Comprar">
                </form>
                <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST">
                    <input type="submit" name="vaciar" value="Vaciar cesta">
                </form>
        <?php
                echo '</fieldset>';
            }
        

        ?>
</body>

</html>