<html>
    <head>
        <title>Ejercicios</title>
    </head>
    <body>
        <?php
        //Jaime Hernansanz
        //Ejercicio 1
        echo "EJERCICIO 1:<br>";
            echo    "Este es el resultado correcto del primer ejercicio";
            print "<br>Este tambien, para tener los dos";
            echo "<hr>";
        //Ejercicio 2  
            echo "EJERCICIO 2:<br>";
            echo    "Segundo ejercicio:<br>Visualizaci�n del contenido de variables";
            //la variable nombre almacenar� un String con mi nombre
            $nombre= "Jaime";
            //La variable edad almacenara mi edad como entero
            $edad=32;
            echo '<br>'.
                    "Mi nombre es ". $nombre. " y mi edad es ".$edad." a�os.";
            echo "<hr>";
        //Ejercicio 3
            
        echo "EJERCICIO 3:<br>";
            $operador1=13; $operador2=4;
            $resultado;
            $resultado=$operador1-$operador2;
            echo "El resultado de 13 - 4 es: ".$resultado."<br>";
            $resultado=$operador1+$operador2;
            echo "El resultado de 13 + 4 es: ".$resultado."<br>";
            $resultado=$operador1*$operador2;
            echo "El resultado de 13 * 4 es: ".$resultado."<br>";
            $resultado=$operador1/$operador2;
            echo "El resultado de 13 / 4 es: ".$resultado."<br>";
            $resultado=$operador1%$operador2;
            echo "El resultado de 13 % 4 es: ".$resultado."<br>";
            echo "<hr>";
            
        //Ejercicio 4
        echo "EJERCICIO 4:<br>";
            echo 'Informacion de la variable "nombre": ';
            echo (var_dump($nombre)."<br>");
            echo "Contenido de la variable: ".$nombre."<br>";
            $nombre=null;
            echo "Despues de asignarle un valor nulo: ";
            echo (var_dump($nombre)."<br>");
            echo "<hr>";
        
        //Ejercicio 5
        echo "EJERCICIO 5:<br>";
            $temporal="Juan";
            echo "Vamos a ir mostrando los valores segun modificamos la variable:<br>";
            echo $temporal." es del tipo: ".gettype($temporal)."<br>";
            $temporal=round(Pi(),2);
            echo $temporal." es del tipo: ".gettype($temporal)."<br>";
            $temporal=false;
            echo var_dump($temporal);
            echo " es del tipo: ".gettype($temporal)."<br>";
            $temporal=3;
            echo $temporal." es del tipo: ".gettype($temporal)."<br>";
            $temporal=null;
            echo var_dump($temporal)." es del tipo: ".gettype($temporal)."<hr>"; 
        //ahora lo hare con un array porque no se si tengo que poner uno u otro
           $temporal=["Juan",round(Pi()),2,false,3,null]; 
           echo $temporal[0]." es del tipo: ".gettype($temporal[0])."<br>";
           echo $temporal[1]." es del tipo: ".gettype($temporal[1])."<br>";
           echo $temporal[2]." es del tipo: ".gettype($temporal[2])."<br>";
           echo var_dump($temporal[3])." es del tipo: ".gettype($temporal[3])."<br>";
           echo $temporal[4]." es del tipo: ".gettype($temporal[4])."<br>";
           echo var_dump($temporal[5])." es del tipo: ".gettype($temporal[5])."<br>";
           echo "<br>";
        ?>

    </body>
</html>

