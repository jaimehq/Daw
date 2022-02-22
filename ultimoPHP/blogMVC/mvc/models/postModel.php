<?php

/**
 * Description of postModel
 *
 * @author dwes
 */
require_once './db/DB.php';

class Post {

    // Propiedades
    private $title;
    private $text;
    private $publicationDate;
    private $author;    // Es un id

    // Métodos    
    function getTitle() {
        return $this->title;
    }

    function getText() {
        return $this->text;
    }

    function getPublicationDate() {
        return $this->publicationDate;
    }

    function getAuthor() {
        return $this->author;
    }

    function setTitle($title): void {
        $this->title = $title;
    }

    function setText($text): void {
        $this->text = $text;
    }

    function setPublicationDate($publicationDate): void {
        $this->publicationDate = $publicationDate;
    }

    function setAuthor($author): void {
        $this->author = $author;
    }

    function publishPost(): bool {
        // Connect with DB
        DB::conectarDB();

        // Crear la consulta de inserción
        $sql = 'INSERT INTO ' . POST_TABLE . ' (' . POST_TITLE . ', ' . POST_BODY . ', ' . POST_DATE . ', ' . POST_AUTHOR . ') VALUES(?,?,?,?)';
        
        // Preparar query
        DB::prepararQuery($sql, [$this->title, $this->text, $this->publicationDate, $this->author]);
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

    function getAllPostsFromDB(): array {
        // Connect with DB
        DB::conectarDB();

        // Read content from table of posts
        $sql = 'SELECT * FROM ' . POST_TABLE;
        DB::prepararQuery($sql);
        $queryOK = DB::ejecutarQueryPreparada();

        // Devolver a una variable el resultado de la operación
        if ($queryOK)
            $result = DB::devuelveTodo();
        else
            $result = false;

        // Cerrar conexión con la base de datos
        DB::desconectarDB();

        // Devolvemos registros afectados
        return $result;
    }

}
