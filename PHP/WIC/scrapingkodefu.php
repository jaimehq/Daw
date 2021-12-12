<?php
//debido a que la funcion file_get_contents tarda bastante en ejecutarse hay que modificar el tiempo maximo de ejecucion para que
//pueda terminar
set_time_limit(3000);
$url = 'https://carrefour.es';
//se pasa la url a un string
$html = file_get_contents($url);
//creamos 2 arrays uno para productos y otro para catalogos
$arrayUrlsProductos = [];
$arrayUrlsCatalogos = [];
//metemos en el array matches todo lo que coincida con la reg ex introducida
//la varieble ocurrencias sera un entero que nos dice el numero de veces que encuentra la expresion
$ocurrencias = preg_match_all('/<a href="(\S+supermercado(\S*?))"/', $html, $matches);

//rellenamos las rutas relativas
for ($i = 0; $i < count($matches[1]); $i++) {
    if (preg_match('/^\//', $matches[1][$i])) {
        $matches[1][$i] = $url .  $matches[1][$i];
    }
}


//buscamos los lincks dentro de los lincks de las distintas secciones encontrados en la pag principal
//matches sera un array de arrays en el que la posicion 0 es lo que coincide con la reg ex entera
//la posicion 1 es lo que hay entre el primer parentesis
foreach ($matches[1] as $ocu) {
    //primero convertimos a texto cada ocurrencia
    $html2 = file_get_contents($ocu);
    try {
        //hacemos lo mismo, metemos en matches2 todo lo que encontremos en nuestra expresion
        //si no hay ninguna coincidencia lanzaremos la excepcion
        if (!$ocurrencias2 = preg_match_all('/href="(\/supermercado\/[A-Z](\S*?))"/', $html2, $matches2))
            throw new Exception('El linck ' . $ocu . "no tiene lincks<br>");
        
        //si la pagina solo tiene una ocurrencia encontrada es de otro tipo distinto a las demas 
        //asique diferenciaremos los de 1 sola ocurrencia de los demas
        //links acabados en c son catalogos y acapados en p productos
        if ($ocurrencias2 != 1) {
            //si hay mas de una ocurrencia buscamos todos los links de productos y los metemos en el array
            foreach ($matches2[1] as $ocu2) {
                if (preg_match('/\S+\/p$/', $ocu2)) {
                    array_push($arrayUrlsProductos, $ocu2);
                }
            }
            //en caso contrario vamos a diferenciar catalogos, productos y paginacion
        } else {
            //hacemos una nueva busqueda y lo metemos en marches2
            $ocurrencias2 = preg_match_all('/<a href="(\/supermercado\S*?)"/', $html2, $matches2);
            foreach ($matches2[1] as $ocu2) {
                //para todas las ocurrencias hacemos la seleccion de lo que es
                //si es producto lo metemos en su array
                if (preg_match('/\S+\/p$/', $ocu2)) {
                    array_push($arrayUrlsProductos, $ocu2);
                } 
                //si es catalogo lo metemos en otro array que utilizaremos despues
                else if (preg_match('/\S+\/c$/', $ocu2)) {
                    array_push($arrayUrlsCatalogos, $ocu2);
                } 
                //y por ultimo si es una pagina de productos creo una funcion recursiva para que vaya leyendo cada pagina
                else if (preg_match('/\S+offset=[0-9]{1,3}$/', $ocu2)) {
                    //iniciamos el offset que es el primero producto de la pagina
                    $offset = 0;
                    //y pasamos los parametros a la funcion
                    productosPaginados($ocu2, $url, $offset);
                }
            }
        }
    } catch (Exception $e) {
        echo $e;
    }
}
//primero borramos los campos repetidos del array de catalogos
$arrayUrlsCatalogos=array_unique($arrayUrlsCatalogos);
//despues recorremos dicho array de uno en uno buscando todos los productos o paginaciones
//aqui es donde la matan y se tira tranquilamente 10min dando vueltas
foreach ($arrayUrlsCatalogos as $catalogo) {
    $html = file_get_contents($url . $catalogo);
    $ocurrencias2 = preg_match_all('/<a href="(\/supermercado\S*?)"/', $html, $matches2);
    foreach ($matches2[1] as $ocu2) {
        //en el caso de que sea un producto lo metemos en el array
        if (preg_match('/\S+\/p$/', $ocu2)) {
            array_push($arrayUrlsProductos, $ocu2);
        }
        //en el caso de que sea una paginacion llamamos a la funcion que lo recorre
        else if (preg_match('/\S+offset=[0-9]{1,3}$/', $ocu2)) {
            $offset = 0;
            productosPaginados($ocu2, $url, $offset);
        }
    }
}
//esta funcion recorre e inserta en el array productos todos los productos encontrados en las distintas paginas
//se le pasa la url de la pagina que desea escanear, la url principal para tener una url completa
//y el offset que sera elultimo articulo de la pagina anterior para que no se equivoque y vuelva a la pagina anterior
//con esto conseguimos que cuando no encuentre mas ocurrencias de offset mayores acabe la funcion recursiva
function productosPaginados($urlPaginada, $urlPrincipal, $offset)
{
    //llamamos al array productos
    global $arrayUrlsProductos;
    //creamos la url completa
    $urlPaginada = $urlPrincipal . $urlPaginada;
    //convertimos en texto la pagina y empezamos a buscar
    $html = file_get_contents($urlPaginada);
    preg_match_all('/<a href="(\/supermercado\S*?)"/', $html, $matches3);
    foreach ($matches3[1] as $ocu3) {
        //si es producto, lo metemos al array
        if (preg_match('/\S+\/p$/', $ocu3)) {
            array_push($arrayUrlsProductos, $ocu3);
        } 
        //si es paginada lo primero buscamos el numero de offset
        else if (preg_match('/\S+offset=[0-9]{1,3}$/', $ocu3)) {
            $offsetN = preg_match('/[0-9]{2,3}$/', $ocu3);
            //y su el offset que aparece es mayor al que le dimos por parametro volvemos a realizar la misma accion
            if ($offsetN > $offset)
                productosPaginados($ocu3, $urlPrincipal, $offsetN);
        }
    }
}
//limpiamos el array de productos repetidos
$arrayUrlsProductos=array_unique($arrayUrlsProductos);
//mostramos cuantas url hay en el array
echo '<hr>' . count($arrayUrlsProductos) . '<hr>';
//y los listamos por pantalla
foreach ($arrayUrlsProductos as $urlP) {
    echo $url . $urlP . '<br>';
}
//la posicion 1 es la que alberga el primer campo entre parentesis del patron
//la posicion 0 engloba todo el patron completo
/* foreach ($matches[1] as $ocu) {
    echo ($ocu);
    echo '<br>';
} */
