<?php

abstract class Persona {
    public $nombre;
    public $edad;
    
    public function cargarDatos($nombre, $edad) {
        $this->nombre = $nombre;
        $this->edad = $edad;
    }
    public function imprimirDatos(){
        echo "La persona se llama".$this->nombre." y tiene ". $this->edad." años";
    }
}
