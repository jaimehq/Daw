<?php
require_once('./mvc/models/UsuarioModel.php');
require_once('./mvc/models/ProductoModel.php');
//$arrayProductos;
session_start();

if (!isset($_GET['controller']) || (isset($_GET['controller']) && empty($_GET['controller']))) {
    $html = crearLogin();
} else {
    switch ($_GET['controller']) {
        case 'usuario':
            if ($_GET['action'] == 'checkUsuario' && isset($_POST['usuario']) && isset($_POST['password'])) {
                try {
                    $usuario = new Usuario($_POST['usuario'], $_POST['password']);
                    if ($usuario->checkUsuario(USER_FIELD, PASS_FIELD, AUTH_TABLE)) {
                        $_SESSION['usuario'] = $_POST['usuario'];
                        //y cambiamos de pagina
                        echo 'Se ha logueado correctamente';
                        header("Refresh:3;url=index.php?controller=productos");
                        die();
                    } else {
                        //en el caso contrario damos la opcion de volver al login o registrarse
                        $html = '<h4>El login es incorrecto, desea volver al login o registrarse <a href="index.php">Login</a> <a href="index.php?controller=registrar&action=registrarUsuario">Registrarse</a></h4> ';
                    }
                } catch (PDOException $e) {
                    echo "Excepción capturada: ", $e->getMessage(), (int)$e->getCode();
                }
            }
            break;
        case 'registrar':
            $html = crearRegistro();
            if ($_GET['action'] == 'registrarUsuario' && isset($_POST['usuario']) && isset($_POST['password1']) && isset($_POST['password2'])) {
                if ($_POST['password1'] == $_POST['password2']) {
                    try {
                        $usuario = new Usuario($_POST['usuario'], $_POST['password1']);
                        if ($usuario->anadirUsuario(USER_FIELD, PASS_FIELD, AUTH_TABLE)) {
                            $_SESSION['usuario'] = $_POST['usuario'];
                            //y cambiamos de pagina
                            echo 'se ha registrado hay que cambiar esto';
                            die();
                        } else {
                            //en el caso contrario damos la opcion de volver al login o registrarse
                            $html = '<h4>El login es incorrecto, desea volver al login o registrarse <a href="index.php">Login</a> <a href="index.php?controller=registrar">Registrarse</a></h4> ';
                        }
                    } catch (PDOException $e) {
                        echo "Excepción capturada: ", $e->getMessage(), (int)$e->getCode();
                    }
                } else {
                    echo 'Las contraseñas no coinciden';
                }
            }
            break;
        case 'productos':
            //crear la tabla de los productos
            $html = crearTablaProductos();
            $html .= gestionarCesta();
            break;
        case 'desconectar':
            $html = desconexion();
            break;
            case 'comprar':
                $html = vistaCompra();
                break;
    }
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'anadirProductos':
                anadirProductoACesta();
                $html .= gestionarCesta();
                break;
        }
    }
}
echo $html;

function vistaCompra(){

}

function anadirProductoACesta()
{
    global $arrayProductos;
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['agregar'])) {
        //comprobamos que haya algun producto seleccionado
        if (!empty($_POST['producto'])) {
            //si la cesta no existe la creamos
            if (!isset($_SESSION['cesta']))
                $_SESSION['cesta'] = [];
            //recorremos el array de productos  para obtener su precio y nombre a partir del codigo que tenemos almacenado    
            $cestaTemp = [];
            foreach ($_POST['producto'] as $productoSeleccionado) {
                foreach ($arrayProductos as $producto) {
                    if ($producto['cod'] == $productoSeleccionado)
                        array_push($cestaTemp, $producto);
                }
            }
            $arrayObjetosProductos = [];
            foreach ($cestaTemp as $productoArray) {
                $objProducto = new Producto($productoArray);
                array_push($arrayObjetosProductos, $objProducto);
            }
            foreach ($arrayObjetosProductos as $objetoProducto) {
                //metemos la informacion en un array
                $paMeter = array('nombre' => $objetoProducto->nombre_corto, 'pvp' => $objetoProducto->pvp, 'unidades' => 1);
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
        }
    }
    $_POST['producto'] = '';
}
function gestionarCesta()
{
    if (isset($_SESSION['cesta']) && $_SESSION['cesta'] != []) {
        //asignamos una variable del total
        $totalCesta = 0;
        $formularioCesta = file_get_contents('./mvc/views/cestaView.html');
        $celdasPaMeter = '';
        //y recorremos el array para imprimir lo que tenga dentro a la vez que vamos calculando el total
        foreach ($_SESSION['cesta'] as $linea) {
            $fila = file_get_contents('./sites_media/html/filaCesta.html');
            $precio3 = (float)$linea['pvp'];
            $fila = str_replace('{nombre}', $linea['nombre'], $fila);
            $fila = str_replace('{precio}', $linea['pvp'], $fila);
            $fila = str_replace('{unidades}', $linea['unidades'], $fila);
            $totalCesta = $totalCesta + $precio3 * $linea["unidades"];
            $celdasPaMeter .= $fila;
        }
        $formularioCesta = str_replace('{filasCesta}', $celdasPaMeter, $formularioCesta);
        $formularioCesta = str_replace('{total}', $totalCesta, $formularioCesta);
        //imprimimos la tabla
        return $formularioCesta;
    }
}

function desconexion()
{
    if (!isset($_SESSION['usuario'])) {
        return file_get_contents('./mvc/views/usuarioSinIdentificar');
    } else {
        //en caso de que si exista destruimos la informacion de la sesision y redirigimos a la pagina de login
        session_destroy();
        header('Location: ' . 'index.php');
    }
}
function crearTablaProductos()
{
    if (!isset($_SESSION['usuario'])) {
        $html = file_get_contents('./mvc/views/usuarioSinIdentificar');
    } else {
        //en el caso de que se pulse el voton de vaciar la cesta la vaciamos
        if (isset($_POST['vaciar'])) {
            unset($_SESSION['cesta']);
            header('Location: ' . './index.php?controller=productos');
            //en el caso de que se pulse comprar iremos a la pagina correspondiente
        }
        if (isset($_POST['comprar'])) {
            header('Location: ' . './index.php?controller=comprar');
        }
        $html = file_get_contents('./mvc/views/indexView.html');
        $html = str_replace('{titulo}', 'Productos', $html);
        $headerDesconexion = file_get_contents('./sites_media/html/desconectarUsuarioHeader.html');
        $headerDesconexion = str_replace('{usuario}', $_SESSION['usuario'], $headerDesconexion);
        $cadena = $headerDesconexion;
        DB::conectarDB();
        $sql = 'SELECT * FROM ' . PRODUCTO_TABLE . ';';
        DB::prepararQuery($sql);
        $celdasParaAgregar = '';
        if (DB::ejecutarQueryPreparada()) {
            global $arrayProductos;
            $arrayProductos = DB::devuelveTodo();
            DB::desconectarDB();
            foreach ($arrayProductos as $resultado) {
                $fila = file_get_contents('./sites_media/html/filaTablaProductos.html');
                $fila = str_replace('{nombreProducto}', $resultado['nombre_corto'], $fila);
                $fila = str_replace('{precioProducto}', $resultado['PVP'], $fila);
                $fila = str_replace('{codProducto}', $resultado['cod'], $fila);
                $celdasParaAgregar .= $fila;
            }
            $formProductos = file_get_contents('./mvc/views/formProductosView.html');
            $formProductos = str_replace('{celdasProductos}', $celdasParaAgregar, $formProductos);
            $cadena .= $formProductos;
            $html = str_replace('{formulario}', $cadena, $html);
        }
    }
    return $html;
}

function crearRegistro()
{
    $html = file_get_contents('./mvc/views/indexView.html');
    $html = str_replace('{titulo}', 'Registro', $html);
    $pass = file_get_contents('./sites_media/html/contraseñaTabla.html');
    $pass = str_replace('{passwordName}', 'password1', $pass);
    $pass2 = file_get_contents('./sites_media/html/contraseñaTabla.html');
    $pass2 = str_replace('{passwordName}', 'password2', $pass2);
    $pass = $pass . $pass2;
    $form = file_get_contents('./sites_media/html/login.html');
    $form = str_replace('{trozoContraseñas}', $pass, $form);
    $form = str_replace('{valorInput}', 'LogIn', $form);
    $form = str_replace('{accion}', './index.php?controller=registrar&action=registrarUsuario', $form);
    $html = str_replace('{formulario}', $form, $html);
    return $html;
}
function crearLogin()
{
    $html = file_get_contents('./mvc/views/indexView.html');
    $html = str_replace('{titulo}', 'Login', $html);
    $pass = file_get_contents('./sites_media/html/contraseñaTabla.html');
    $pass = str_replace('{passwordName}', 'password', $pass);
    $form = file_get_contents('./sites_media/html/login.html');
    $form = str_replace('{trozoContraseñas}', $pass, $form);
    $form = str_replace('{valorInput}', 'LogIn', $form);
    $form = str_replace('{accion}', './index.php?controller=usuario&action=checkUsuario', $form);
    $html = str_replace('{formulario}', $form, $html);
    return $html;
}
