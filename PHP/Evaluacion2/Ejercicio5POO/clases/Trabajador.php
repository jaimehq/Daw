<?php

abstract class Trabajador{
    public $nombre;
    public $sueldo;
    static $numTrabajadores=0;

    public abstract function calcularSueldo();
    public function imprimirDatos(){
        echo 'Nombre: '.$this->nombre.'<br>Sueldo: '.$this->sueldo.'<hr>';
    }
}

?>