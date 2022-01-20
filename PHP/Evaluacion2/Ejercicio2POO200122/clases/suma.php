<?php
require_once 'operacion.php';
class Suma extends Operacion{
    //propiedades
    //todos los heredados

    //metodos
    public function __construct($var1,$var2)
    {
        $this->cargar1($var1);
        $this->cargar2($var2);
        $this->suma();        
        $this->mostrarResultado();
    }
    public function suma(){
        $this->resultado=$this->valor1+$this->valor2;
    }
}
?>