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
class Suma extends Operacion{
    public $titulo;
    
    public function __construct($tit, $v1, $v2) {
        echo "Entro al constructor de Suma";
        parent::__construct($v1, $v2);
        $this->titulo = $tit;
    }
}
