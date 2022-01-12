<?php
class BD
{
    const HOST = 'localhost';
    const DB = 'dwes';
    const USER = 'root';
    const PASSWORD = '1234';
    const DSN = "mysql:host=".self::HOST.";dbname=".self::DB;
    private static $conexion;
    public function ObtieneProducto()
    {        
        $buscador = self::$conexion->prepare('SELECT nombre_corto, pvp,cod FROM producto ');
        $buscador->execute();
        $row = $buscador->fetch();
    }
    public function conexionBD(){
        self::$conexion = new PDO(self::DSN, self::USER, self::PASSWORD);
    }
}
