<?php
require_once 'Trabajador.php';

class Empleado extends Trabajador{
    public $horasTrabajadas;
    public $valorHora=3.5;
    public function __construct($nombre, $horasTrabajadas)
    {
        $this->nombre=$nombre;
        $this->horasTrabajadas=$horasTrabajadas;
        parent::$numTrabajadores=parent::$numTrabajadores+1;
        $this->calcularSueldo();
    }
    public function calcularSueldo()
    {
        $this->sueldo=$this->horasTrabajadas*$this->valorHora;
    }

}



?>
