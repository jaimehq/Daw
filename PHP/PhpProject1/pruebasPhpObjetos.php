<html>
    <?php
        $salida = "Contenido PHP";
    ?>
    <head>
        <title>
            <?php
            //se puede poner php donde te da la gana
                echo $salida;
            ?>
        </title>
        <meta charset="UTF-8">
    </head>
    <body>
        <?php
            class Car {
                public $color;
                public $model;
                public function constructor($color, $model){
                    $this->color = $color;
                    $this->model = $model;
                }
                public function message(){
                    return "Mi coche es ".$this->color." ". $this->model."!";
                }
            }
            
            $myCar = new Car ("black","volvo");
            echo $myCar->message();
            ?>
    </body>
</html>
