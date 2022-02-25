<?php

/*
 * Generales de conexión a la BD
 */

define("DBHOST", 'localhost');
define("DBUSER", 'root');
define("DBPASS", '');
define("DBPORT", 3310);
define("DB", 'dwes');
define("DBOPTIONS", [
        'PDO::ATTR_ERRMODE' => 'PDO::ERRMODE_EXCEPTION',
        'PDO::ATTR_DEFAULT_FETCH_MODE' => 'PDO::FETCH_BOTH'
    ]);

/*
 * Relativas al chequeo de usuarios logueados
 */
define("USER_FIELD", 'username');
define("PASS_FIELD", 'password');
define("AUTH_TABLE", 'autenticacion');

/*
 * Relativas a la tabla productos
 */
define("PRODUCTO_COD", 'cod');
define("PRODUCTO_DESCRIPCION", 'cod');
define("PRODUCTO_FAMILIA", 'cod');
define("PRODUCTO_NOMBRE_CORTO", 'cod');
define("PRODUCTO_PVP", 'PVP');
define("PRODUCTO_TABLE", 'producto');

/*
 * Relativas a la tabla de familia
 */
define("FAMILIA_COD", 'cod');
define("FAMILIA_NOMBRE", 'nombre');
define("FAMILIA_TABLE", 'familia');

/*
 * Relativas a la tabla de stock
 */
define("STOCK_PRODUCTO", 'producto');
define("STOCK_TIENDA", 'tienda');
define("STOCK_UNIDADES", 'unidades');
define("STOCK_TABLE", 'stock');

/*
 * Relativas a la tabla de tienda
 */
define("TIENDA_COD", 'cod');
define("TIENDA_NOMBRE", 'nombre');
define("TIENDA_TLF", 'tlf');
define("TIENDA_TABLE", 'tienda');

?>

