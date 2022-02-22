<?php

/*
 * Generales de conexión a la BD
 */

define("DBHOST", 'localhost');
define("DBUSER", 'root');
define("DBPASS", '');
define("DBPORT", 3310);
define("DB", 'blog');
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
 * Relativas a los autores de posts
 */
define("AUTHOR_ID", 'id');
define("AUTHOR_NAME", 'username');
define("AUTHOR_TABLE", 'author');

/*
 * Relativas a los posts
 */
define("POST_TITLE", 'title');
define("POST_BODY", 'text');
define("POST_DATE", 'publicationDate');
define("POST_AUTHOR", 'author');
define("POST_TABLE", 'post');

?>

