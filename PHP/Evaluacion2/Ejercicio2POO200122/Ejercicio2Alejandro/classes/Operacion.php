<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Operacion
 *
 * @author dwes
 */
abstract class Operacion {
    
    // Propiedades
    public $valor1;
    public $valor2;
    public $resultado;
    
    // Métodos
    public function cargar1($val1) {
        // Cargaremos contenido de $valor1
        $this->valor1 = $val1;
    }
    
    public function cargar2($val2) {
        // Cargaremos contenido de $valor2
        $this->valor2 = $val2;
    }
    
    public function devolverResultado() {
        // Mostraremos el resultado
        return $this->resultado;
    }
    
}
