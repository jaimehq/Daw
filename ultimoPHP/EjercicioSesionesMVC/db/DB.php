<?php
//vamos a reutilizar la clase BD utilizada en clase para este ejercicio

require './config/configDB.php';

class DB {
    private static $conexion;
    private static $consulta;
    public static function conectarDB() {
        // Conexión a base de datos es importante modificar el puerto en el archivo de configuracion de la BD
        //ya que mi puerto de la base de datos es distinto al de clase
        $dsn = "mysql:host=" . DBHOST . ":".DBPORT.";dbname=" . DB;
        try {
            self::$conexion = new PDO($dsn, DBUSER, DBPASS, DBOPTIONS);
        } catch (PDOException $e) {
            echo "Excepción capturada: ", $e->getMessage(), (int) $e->getCode();
        }
    }
    
    public static function desconectarDB() {
        // Cierro la consulta con la base de datos
        if (self::$consulta) {
            self::$consulta = null;
        }
        // Cierro la conexión con la base de datos
        if (self::$conexion) {
            self::$conexion = null;
        }
    }

    public static function prepararQuery($sql, $params = array()) {
        self::$consulta = self::$conexion->prepare($sql);
        for ($i = 0; $i < count($params); $i++) {
            self::$consulta->bindParam($i+1, $params[$i]);
        }
    }
    
    public static function ejecutarQueryPreparada() : bool {
        try {
            self::$consulta->execute();
        } catch (PDOException $pexc) {
            return false;
        }
        
        return true;
    }
    
    public static function registrosAfectados() : int {
        return self::$consulta->rowCount();
    }
    
    public static function devuelveTodo() : array {
        return self::$consulta->fetchAll();
    }

}

?>
