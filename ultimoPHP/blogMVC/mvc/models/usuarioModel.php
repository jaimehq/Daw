<?php

/**
 * Description of usuarioModel
 *
 * @author dwes
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
    
    function checkUsuario() : bool {
        // Conectar a la base de datos
        DB::conectarDB();
        
        // Chequear usuario y password en la tabla de autenticación
        $sql = 'SELECT '.USER_FIELD.', '.PASS_FIELD.' FROM '.AUTH_TABLE.' WHERE '.USER_FIELD.' = ? AND '.PASS_FIELD.' = ?';
        DB::prepararQuery($sql, [$this->username, $this->password]);
        $queryOK = DB::ejecutarQueryPreparada();
        
        // Devolver a una variable el resultado de la operación
        if ($queryOK)
            $result = DB::registrosAfectados();
        else
            $result = false;
        
        // Cerrar conexión con la base de datos
        DB::desconectarDB();
        
        // Devolvemos registros afectados
        return $result;
    }
    
    function registraUsuario() : bool {
        // Conectar a la base de datos
        DB::conectarDB();
        
        // Crear la consulta de inserción
        $sql = 'INSERT INTO '.AUTH_TABLE.' ('.USER_FIELD.', '.PASS_FIELD.') VALUES(?,?)';
        
        // Preparar query
        DB::prepararQuery($sql, [$this->username, $this->password]);
        $queryOK = DB::ejecutarQueryPreparada();
        
        // Devolver a una variable el resultado de la operación
        if ($queryOK)
            $result = DB::registrosAfectados();
        else
            $result = false;
        
        // Cerrar conexión con la base de datos
        DB::desconectarDB();
        
        // Devolver resultado de la operación
        return $result;        
    }
    
}

?>