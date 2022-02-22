<?php

define("DBHOST", 'localhost');
define("DBUSER", 'root');
define("DBPASS", '');
define("DBPORT", 3306);
define("DB", 'dwes');
define("DBOPTIONS", [
        'PDO::ATTR_ERRMODE' => 'PDO::ERRMODE_EXCEPTION',
        'PDO::ATTR_DEFAULT_FETCH_MODE' => 'PDO::FETCH_BOTH'
    ]);

?>

