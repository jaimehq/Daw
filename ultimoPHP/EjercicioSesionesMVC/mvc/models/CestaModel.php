<?php
require_once('./mvc/models/ProductoModel.php');
class Cesta{
    public static $productosCesta=[];

    public static function anadirProductoACesta()
    {
        global $arrayProductos;
        if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['agregar'])) {
            //comprobamos que haya algun producto seleccionado
            if (!empty($_POST['producto'])) {
                
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
                    $paMeter = array('producto' => $objetoProducto, 'unidades' => 1);
                    //creamos una variable para saber si esta o no en el array cesta
                    $agregado = false;
                    //recorremos el array de sesion para ver si el producto ya esta en el
                    for ($i = 0; $i < count(self::$productosCesta['unidades']); $i++) {
                        if ($paMeter['producto']->nombre_corto === self::$productosCesta['producto']->nombre_corto) {
                            self::$productosCesta['unidades']++; 
                            //y la variable agregado la marcamos a true
                            $agregado = true;
                        }
                    }
                    //en caso de que no haya articulo en el array le agregamos
                    if ($agregado === false) {
                        array_push(self::$productosCesta, $paMeter);
                    }
                }
            }
        }
        $_POST['producto'] = '';
        
    }
    public static function actualizarSesionCesta(){
        $_SESSION['cesta']=self::$productosCesta;
    }
    public static function borrarCesta(){
        self::$productosCesta=[];
    }
    public static function gestionarCesta()
    {
        if (isset($_POST['vaciar'])) {
            unset($_SESSION['cesta']);
            header('Location: ' . './index.php?controller=productos');
            //en el caso de que se pulse comprar iremos a la pagina correspondiente
        }
        if (isset($_POST['comprar'])) {
            header('Location: ' . './index.php?controller=comprar');
        }
        if (isset($_SESSION['cesta']) && $_SESSION['cesta'] != []) {
    
            //asignamos una variable del total
            $totalCesta = 0;
            $formularioCesta = file_get_contents('./mvc/views/cestaView.html');
            $celdasPaMeter = '';
            //y recorremos el array para imprimir lo que tenga dentro a la vez que vamos calculando el total
            foreach ($_SESSION['cesta'] as $linea) {
                $fila = file_get_contents('./sites_media/html/filaCesta.html');
                $precio3 = (float)$linea['producto']->pvp;
                $fila = str_replace('{nombre}', $linea['producto']->nombre_corto, $fila);
                $fila = str_replace('{precio}', $linea['producto']->pvp, $fila);
                $fila = str_replace('{unidades}', $linea['unidades'], $fila);
                $totalCesta = $totalCesta + $precio3 * (float)$linea["unidades"];
                $celdasPaMeter .= $fila;
            }
            $formularioCesta = str_replace('{filasCesta}', $celdasPaMeter, $formularioCesta);
            $formularioCesta = str_replace('{total}', $totalCesta, $formularioCesta);
            //aqui ponemos los botones dependiendo del controlador
            if ($_GET['controller'] == 'productos') {
                $formularioCesta = str_replace('{boton1}', 'comprar', $formularioCesta);
                $formularioCesta = str_replace('{boton1v}', 'Comprar', $formularioCesta);
                $formularioCesta = str_replace('{boton2}', 'vaciar', $formularioCesta);
                $formularioCesta = str_replace('{boton2v}', 'Vaciar cesta', $formularioCesta);
            }
            if ($_GET['controller'] == 'comprar') {
                $formularioCesta = str_replace('{boton1}', 'pagar', $formularioCesta);
                $formularioCesta = str_replace('{boton1v}', 'Pagar', $formularioCesta);
                $formularioCesta = str_replace('{boton2}', 'vaciar', $formularioCesta);
                $formularioCesta = str_replace('{boton2v}', 'Vaciar cesta', $formularioCesta);
            }
            //imprimimos la tabla
            return $formularioCesta;
        }
    }
}

?>