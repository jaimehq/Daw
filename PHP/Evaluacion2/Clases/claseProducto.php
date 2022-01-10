<?php
class Producto{
    public $nombre;
    public $color;

    public function Producto($prod,$color){
        $this->nombre=$prod;
        $this->color=$color;
    }
    public function muestra(){
        echo 'El objeto es '.$this->nombre.' y tiene el color '.$this->color;
    }
    public function getNombre(){
        return $this->nombre;
    }
    public function setNombre($nuevoNombre){
        $this->nombre=$nuevoNombre;
    }
    public function getcolor(){
        return $this->color;
    }
    public function setColor($nuevoColor){
        $this->color=$nuevoColor;
    }
}
?>