<?php
$url = 'https://carrefour.es';
$html = file_get_contents($url);
$arrayUrlsProductos = [];
$ocurrencias = preg_match_all('/<a href="(\S+supermercado(\S*?))"/', $html, $matches);
echo "Numero de coincidencias encontradas: " . ($ocurrencias);
echo '<br>';
//rellenamos las rutas relativas
for ($i = 0; $i < count($matches[1]); $i++) {
    if (preg_match('/^\//', $matches[1][$i])) {
        $matches[1][$i] = $url .  $matches[1][$i];
    }
}


//buscamos los lincks dentro de los lincks de las distintas secciones encontrados en la pag principal
foreach ($matches[1] as $ocu) {
    echo '<h4>' . $ocu . '</h4>';
    $html2 = file_get_contents($ocu);
    try {

        if (!$ocurrencias2 = preg_match_all('/href="(\/supermercado\/[A-Z](\S*?))"/', $html2, $matches2))
            throw new Exception('El linck ' . $ocu . "no tiene lincks<br>");
        echo "Numero de coincidencias encontradas en segunda vuelta: " . ($ocurrencias2);
        echo '<br>';
        //si la pagina solo tiene una ocurrencia encontrada es de otro tipo distinto a las demas porque tienen
        //los productos paginados asique diferenciaremos los de 1 sola ocurrencia de los demas
        //lincks acabados en c son catalogos y acapados en p productos
        if ($ocurrencias2 != 1) {
            foreach ($matches2[1] as $ocu2) {
                if (preg_match('/\S+\/p$/', $ocu2)) {
                    array_push($arrayUrlsProductos, $ocu2);
                }
                echo ($ocu2);
                echo '<br>';
            }
        } else {
            $ocurrencias2 = preg_match_all('/<a href="(\/supermercado\S*?)"/', $html2, $matches2);
            foreach ($matches2[1] as $ocu2) {
                if (preg_match('/\S+\/p$/', $ocu2)) {
                    array_push($arrayUrlsProductos, $ocu2);
                }
                echo ($ocu2);
                echo '<br>';
            }
        }
    } catch (Exception $e) {
        echo $e;
    }
}
echo '<hr>' . count($arrayUrlsProductos) . '<hr>';
foreach ($arrayUrlsProductos as $urlP) {
    echo $url . $urlP . '<br>';
}
//la posicion 1 es la que alberga el primer campo entre parentesis del patron
//la posicion 0 engloba todo el patron completo
/* foreach ($matches[1] as $ocu) {
    echo ($ocu);
    echo '<br>';
} */
