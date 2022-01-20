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
class Operacion {
    protected $valor1;
    protected $valor2;
    
    public function __construct($val1, $val2) {
        $this->valor1 = $val1;
        $this->valor2 = $val2;
    }
}
