<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Producto
 *
 * @author dwes
 */
class Producto {

    // Aquí van a ir las propiedades o atributos
    private $nombre;
    private $color;
    private $precio;
    private $cantidad;

    // A continuación meteremos los métodos
    public function muestra() {
        echo 'El objeto ' . $this->nombre . ' tiene color ' . $this->color;
    }

    public function subirElPrecio($euros) {
        $this->precio += $euros;
    }

    public function __set($var, $valor) {
        if (property_exists(__CLASS__, $var)) {
            $this->$var = $valor;
        } else {
            echo "No existe el atributo $var.";
        }
    }

    public function __get($var) {
        if (property_exists(__CLASS__, $var)) {
            return $this->$var;
        }
    }

}
