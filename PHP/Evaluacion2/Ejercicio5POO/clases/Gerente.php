<?php
require_once 'Trabajador.php';

class Gerente extends Trabajador{
    public function __construct($nombre,$sueldoBase)
    {
        $this->nombre=$nombre;
        $this->sueldo=$sueldoBase;
        $this->calcularSueldo();
    }
    public function calcularSueldo()
    {
        $this->sueldo=$this->sueldo*((parent::$numTrabajadores*0.01)+1);
    }

}



?>