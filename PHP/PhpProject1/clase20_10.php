<html>
    <head>
        <title>20 Octubre</title>
    </head>
    <body>
        <?php
        //fechas y horas y movidas varias
            echo "Hoy es ". date("d/m/y", time())."<br>";
            echo "La hora acutal es ".date("H:i:s")."<br>";
            date_default_timezone_set("America/Argentina/Buenos_Aires");
            echo "La hora acutal es ".date("G:i:s")."<br>";
             date_default_timezone_get();
            echo "La hora acutal es ".date("G:i:s")."<br>";
            $date_time = mktime(13, 20, 0, 4, 3,2022);
            var_dump($date_time);
            echo "<br>La hora creada es ". date("d/M/Y h:i:s", $date_time);
            $d = strtotime("June 6 2015 22:45");
            echo "<br>La hora guardada es: ". date("d/M/Y H:i:s", $d)."<br>";
            $d = strtotime("yesterday");
            echo "<br>La hora guardada es: ". date("d/M/Y H:i:s", $d)."<br>";
            $d = strtotime("+3 days");
            echo "<br>La hora guardada es: ". date("d/M/Y H:i:s", $d)."<hr>";
            
        // Estructuras de control
            //if...else if....else
            $a=2;
            if ($a==1){
                echo"La variable a es 1<br>";
                
            }elseif ($a>1) {
                echo "A es mayor que uno";
            }
            else{
                echo "a es menor que uno";
            }
            echo "<hr>";
            //switch
            //lo de siempre mas esto
            switch (true){
                case $a==0:
                    echo "1";
                    break;
                case $a<0:
                    echo "2<br>";
                case $a>0:
                    echo "Este se ha pasado de vuelta";
                    break;
                default :
                    echo "aqui no se cumple na";
            }
            //while
            while ($a==2){
                echo "Ahora vale 2<br>";
                $a++;
                echo "ahora no<br>";
            }
            //do while
            do{
               echo "a ver cuantas veces sale<br>";
               $a--;
            }while($a!=2);
            echo "<hr>";
            //for y foreach
             $array= array(1,2,3,4);   
             // el simbolo & hace que se haga referencia al propio dato del array en vez de
             //unicamente a su representacion, lo que permite modificarlo
            foreach ($array as &$dato){
                $dato++;                
            }
            for ($i=0; $i<count($array);$i++){
            echo "$array[$i]<br>";
            }
        ?>
    </body>
</html>
