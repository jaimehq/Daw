<?php
require_once('./mvc/models/UsuarioModel.php');
require_once('./mvc/models/ProductoModel.php');
require_once('./mvc/models/CestaModel.php');
session_start();
//si se inicia inica la pagina sin ningun controlador creara el login directamente
if (!isset($_GET['controller']) || (isset($_GET['controller']) && empty($_GET['controller']))) {
    $html = crearLogin();
} else {
    //en caso de tener algun controlador comprobaremos cual es para realizar una u otra accion
    switch ($_GET['controller']) {
        //una vez creada la pagina del login se comprobara que el usuario sea correcto
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
            //si el controlador se manda como registrar creara una pagina similar a la de login pero para poder registrarse
        case 'registrar':
            $html = crearRegistro();
            if ($_GET['action'] == 'registrarUsuario' && isset($_POST['usuario']) && isset($_POST['password1']) && isset($_POST['password2'])) {
                if ($_POST['password1'] == $_POST['password2']) {
                    try {
                        $usuario = new Usuario($_POST['usuario'], $_POST['password1']);
                        if ($usuario->anadirUsuario(USER_FIELD, PASS_FIELD, AUTH_TABLE)) {
                            $_SESSION['usuario'] = $_POST['usuario'];
                            //Si el registro es exitoso lo mostraremos por pantalla y redirigiremos con el controlador producto
                            echo 'Se ha registrado correctamente';
                            header("Refresh:3;url=index.php?controller=productos");
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
            //en el caso de que no haya ninguna accion se gestionara la cesta por si hay algo en la sesion
            if (!isset($_GET['action']))
                $html .= Cesta::gestionarCesta();
            break;
            //el caso desconectar nos destruye la sesion y nos redirige a la pagina de login
        case 'desconectar':
            $html = desconexion();
            break;
            //si el controlador es comprar gestionamos lo que seria la pagina pagar
        case 'comprar':
            //si clicamos en pagar redirigiremos con el controlador pagar
            if (isset($_POST['pagar'])) {
                header('Location: ' . './index.php?controller=pagar');
            }
            //si se clica en vaciar se mostrara que la cesta se a vaciado correctamente y redirigiremos a la pagina producto
            if(isset($_POST['vaciar'])){
                echo 'Se ha cesta se ha vaciado correctamente';
                unset($_SESSION['cesta']);
                header("Refresh:3;url=index.php?controller=productos");
                die();
            }
            //si no se da ningun caso anterior crearemos la pagina de la cesta
            $html = file_get_contents('./sites_media/html/desconectarUsuarioHeader.html');
            $html = str_replace('{usuario}', $_SESSION['usuario'], $html);
            $html .=  Cesta::gestionarCesta();
            break;
            //una vez entre con pagar se "gestionara el pago"
        case 'pagar':
            $html = gestionPago();
            break;
    }
    //si la accion es añadir productos gestionaremos con la clase cesta el agregar productos y mostrarlos en la pantalla
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'anadirProductos':
                Cesta::anadirProductoACesta();
                $html .= Cesta::gestionarCesta();
                break;
        }
    }
}
echo $html;
//la funcion gestion pago nos gestionara las acciones una vez se haya hecho click en pagar
function gestionPago()
{
    if (!isset($_SESSION['usuario'])) {
        $html = file_get_contents('./mvc/views/usuarioSinIdentificar');
    } else {
        
        //en el caso contrario se borra la cesta y se muestra un mensaje de que la compra se ha finalizado
        unset($_SESSION['cesta']);
        $html= '<h1>La compra esta finalizada</h1>';
        //dando la opcion de desconectarse o volver a la pagina de producto
        $html.='<h4>¿Desea seguir comprando? <a href="index.php?controller=productos">SI</a> <a href="index.php?controller=desconectar">NO</a></h4> ';
    }
    return $html;
}


//con desconexion nos destruira la sesion y redigira al login
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
//la fucnion crear tabla productos creara la tabla que vera el usuarion cuando accede a la pagina de compra donde puede seleccionar productos
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
//crea la pagina de registro con las distintas vistas y trozos de html
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
//crea la pagina de login con las distintas vistas y trozos de html
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
