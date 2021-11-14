<html>
    <head>
        <title>Clase dia 21</title>
    </head>
    <body>
        <?php //declare( strict_types = 1);
            //funciones sin parámetros
            function funcion1(){
                //aqui se escriben las instrucciones
            }
            function saludaPorPantalla(){
                echo "Hola caracola";
            }
            saludaPorPantalla();
        //funcion con parametros
            function saludo ($mensaje){
                echo $mensaje;
            }
        echo "<br>";
        saludo("HOlaHola");
        function suma2(int $num1, int  $num2){
            
            echo $num1+$num2;
            
        }
        echo '<br>';
        suma2(2,3.3);
        ?>
    </body>
</html>