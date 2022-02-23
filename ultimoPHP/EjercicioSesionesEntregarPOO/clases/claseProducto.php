<?php
class Producto{
    private $cod;
    private $nombre;
    private $nombre_corto;
    private $descripcion;
    private $pvp;
    private $familia;
    /* public function __construct($codigo,$nombre,$descripcion,$pvp,$familia){
        $this->cod=$codigo;
        $this->nombre_corto=$nombre;
        $this->descripcion=$descripcion;
        $this->pvp=$pvp;
        $this->familia=$familia;
    } */
    //creamos un constructor para crearlo en base un array con las posiciones de la BD
    public function __construct($productoArray){
        $this->cod=$productoArray['cod'];
        $this->nombre_corto=$productoArray['nombre_corto'];
        $this->nombre=$productoArray['nombre'];
        $this->descripcion=$productoArray['descripcion'];
        $this->pvp=$productoArray['PVP'];
        $this->familia=$productoArray['familia'];
    }
    public function __set($var, $valor) {
        if (property_exists(__CLASS__, $var)) {
            $this->$var = $valor;
        } else {
            echo "No existe el atributo $var.";
        }
    }

    public function __get($var) {
        if (property_exists(__CLASS__, $var)) {
            return $this->$var;
        }
    }
}
?>