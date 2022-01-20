<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Suma
 *
 * @author dwes
 */

require_once 'Operacion.php';

class Resta extends Operacion {
    
    // Propiedades
    
    // Métodos
    
    public function restar() {
        // Restamos los contenidos de $valor1 y $valor2
        // Y almacenamos el resultado en $resultado
        $this->resultado = $this->valor1 - $this->valor2;
    }
    
    public function cargarYRestar($v1, $v2) {
        // Cargamos los valores y realizamos la operación
        $this->cargar1($v1);
        $this->cargar2($v2);
        $this->resultado = $this->valor1 - $this->valor2;        
    }
    
}
