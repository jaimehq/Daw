<html>
    <head>
        <title>Ejercicio Examen 1 tablero</title>
        <style>
            
            td, tr{
                width: 30px;
                height: 30px;
            }
            
            
        </style>
    </head>
    <body>
        
        <?php
        //Jaime Hernansanz
            $filasColumnas=$_GET['filasColumnas'];//capturamos la variable
            $arrayClolores=["black", "red"];//creo un array de colores para el fondo
            $iC=0;//y un indice para el color
            if($filasColumnas>=1 && $filasColumnas<=20){
                //con este if comprobamos que sea valido el numero introducido
                //empezamos a crear una cadena de caracteres que creara la tabla
                $cadenaTabla="<table>";
                for($i=0;$i<$filasColumnas;$i++){
                    $cadenaTabla=$cadenaTabla."<tr>";
                    //para que sean siempre opuestos vemos si el numero introducido es par
                    if($filasColumnas%2==0){
                        if($iC==0) $iC=1;
                        else $iC=0;
                    }
                    for($j=0;$j<$filasColumnas;$j++){
                        $cadenaTabla=$cadenaTabla."<td style=\"background:".$arrayClolores[$iC]."\"></td>";
                        if($iC==0) $iC=1;
                        else $iC=0;
                    }
                    $cadenaTabla=$cadenaTabla."</tr>";
                }
                $cadenaTabla=$cadenaTabla."</table>";
                //con la tabla completa la mostramos por pantalla
                echo $cadenaTabla;
            }else{
                //en caso de que el valor no sea valido se lo hacemos saber al usuario
                echo "Las filas y columnas han de ser introducidas por la URL y han de estar comprendidas entre 1 y 20(ambos inclusives)";
            }           
            
        ?>
    </body>
</html>