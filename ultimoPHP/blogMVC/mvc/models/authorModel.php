<?php

/**
 * Description of postModel
 *
 * @author dwes
 */
require_once './db/DB.php';

class Author {

    // Propiedades
    private $id;
    private $name;

    // Métodos
    function __construct($name) {
        $this->name = $name;
    }

    function getId() {
        return $this->id;
    }

    function setId($id) : void {
        $this->id = $id;
    }

    function getName() {
        return $this->name;
    }

    function setName($name) : void {
        $this->name = $name;
    }

    function registerAuthor(): bool {
        // Conectar a la base de datos
        DB::conectarDB();

        // Crear la consulta de inserción
        $sql = 'INSERT IGNORE INTO ' . AUTHOR_TABLE . ' (' . AUTHOR_NAME . ') VALUES(?)';

        // Preparar query
        DB::prepararQuery($sql, [$this->name]);
        $queryOK = DB::ejecutarQueryPreparada();

        // Devolver a una variable el resultado de la operación
        if ($queryOK) {
            $result = DB::registrosAfectados();
            // Recupero el id asignado a partir del nombre
            $sql = 'SELECT id FROM ' . AUTHOR_TABLE . ' WHERE ' . AUTHOR_NAME . ' = ?';
            DB::prepararQuery($sql, [$this->name]);
            $queryOK = DB::ejecutarQueryPreparada();
            $this->setId(DB::devuelveTodo()[0][0]);  // Doble cero porque estoy usando PDO::FETCH_BOTH
        } else {
            $result = false;
        }

        // Cerrar conexión con la base de datos
        DB::desconectarDB();

        // Devolver resultado de la operación
        return $result;
    }

}
