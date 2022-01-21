<?php
require_once 'Persona.php';
class Empleado extends Persona{
    //propiedades
    protected $sueldo;

    //metodos
    public function __construct($nombre,$edad,$sueldo)
    {
        $this->cargarDatos($nombre,$edad);        
        $this->cargarSueldo($sueldo);   
    } 
    public function cargarSueldo($sueldo){
        $this->sueldo=$sueldo;
    }
    public function devolverSueldo(){
        return $this->sueldo;
    }
}
?>