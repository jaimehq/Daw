<?php
class BD
{
    const HOST = 'localhost:3310';
    const DB = 'dwes';
    const USER = 'root';
    const PASSWORD = '';
    const DSN = "mysql:host=" . self::HOST . ";dbname=" . self::DB;
    private static $conexion;

    //devuelve un array de los productos con las posiciones [][0]=nombre:corto, [][1]=pvp y [][2]=cod
    public function ObtienerProductos()
    {
        $buscador = self::$conexion->prepare('SELECT nombre_corto, pvp, cod, nombre,descripcion, familia FROM producto ');
        $arrayDatos= [];
        if ($buscador->execute()) {            
            $row = $buscador->fetch();
            while ($row != null) {
                array_push($arrayDatos, $row);
                $row = $buscador->fetch();
            }            
        }
        return $arrayDatos;
    }
    //conecta con la BD asignandolo a una variable estatica de la clase
    public function conexionBD()
    {
        self::$conexion = new PDO(self::DSN, self::USER, self::PASSWORD);
    }
    //esta funcion devolvera false si no existe usuario en la BD, el nombre de usuario si pass y usuario coinciden y
    //el error si no se a podido realizar la consulta
    public function comprobarUsuario($usuario, $contraseña)
    {
        $usuarioValido = '';
        try {
            $sql = 'SELECT username, password FROM autenticacion WHERE username = ? AND password = ?';
            $consulta = self::$conexion->prepare($sql);
            $consulta->bindParam(1, $usuario);
            $consulta->bindParam(2, $contraseña);
            $consulta->execute();
            $registrosEncontrados = $consulta->rowCount();
            if ($registrosEncontrados > 0) {
                $usuarioValido = $usuario;
            } else {
                $usuarioValido = false;
            }
        } catch (PDOException $e) {
            $usuarioValido = "Excepción capturada: " . $e->getMessage() . (int)$e->getCode();
        }
        return $usuarioValido;
    }
}
