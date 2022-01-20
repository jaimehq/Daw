<?php
require_once 'operacion.php';
class Resta extends Operacion{
    //propiedades
    //todos los heredados

    //metodos
    public function __construct($var1,$var2)
    {
        $this->cargar1($var1);
        $this->cargar2($var2);
        $this->resta();        
        $this->mostrarResultado();
    }
    public function resta(){
        $this->resultado=$this->var1-$this->var2;
    }
}
?>