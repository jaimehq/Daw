<?php
abstract class Operacion{
    //propiedades
    public $valor1;
    public $valor2;
    public $resultado;

    //metodos
    public function cargar1($val1){
        //cargaremos contenido del valor1
        $this->valor1=$val1;
    }
    public function cargar2($val2){
        //cargaremos contenido del valor2
        $this->valor2=$val2;
    }
    public function mostrarResultado(){
        //cargaremos contenido del valor1
        echo $this->resultado;
    }
}

?>