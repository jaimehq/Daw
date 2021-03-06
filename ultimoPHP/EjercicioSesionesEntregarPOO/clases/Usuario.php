<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Usuario
 *
 * @author dwes
 */

require_once 'DB.php';

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
    //esta funcion se usara en el modelo MVC
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