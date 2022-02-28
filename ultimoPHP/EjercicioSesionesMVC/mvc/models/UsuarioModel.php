<?php
/**
 * reutilizamos gran parte de la clase usuario que hemos visto en clase
 */
require_once './db/DB.php';

class Usuario {
    
    // Propiedades
    private $username;
    private $password;
    
    // Métodos
    function __construct($username, $password) {
        $this->username = $username;
        $this->password = $password;
    }
    
    function getUsername() {
        return $this->username;
    }

    function getPassword() {
        return $this->password;
    }

    function setUsername($username): void {
        $this->username = $username;
    }

    function setPassword($password): void {
        $this->password = $password;
    }
    
    function checkUsuario($userColName, $passColName, $tableName) : bool {
        // Conectar a la base de datos
        DB::conectarDB();
        // Chequear usuario y password en la tabla de autenticación
        $sql = 'SELECT '.$userColName.', '.$passColName.' FROM '.$tableName.' WHERE '.$userColName.' = ? AND '.$passColName.' = ?';
        DB::prepararQuery($sql, [$this->username, $this->password]);
        DB::ejecutarQueryPreparada();
        $correcto=DB::registrosAfectados() > 0;
        DB::desconectarDB();
        return $correcto;
    }
    //esta funcion se crea a mayores para en caso de tener que agregar un usuarion a la BD lo podamos hacer gestionandolo con esta clase
    function anadirUsuario($userColName, $passColName, $tableName) : bool {
        // Conectar a la base de datos
        DB::conectarDB();
        // Introducir usuario y password en la tabla de autenticación
        $sql = 'INSERT INTO '.$tableName.' ('.$userColName.', '.$passColName.') VALUES ( ? , ?);';
        DB::prepararQuery($sql, [$this->username, $this->password]);
        DB::ejecutarQueryPreparada();
        $correcto=DB::registrosAfectados() > 0;
        DB::desconectarDB();
        return $correcto;
    }
    
}

?>