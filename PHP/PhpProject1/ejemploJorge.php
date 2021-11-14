<html>
    <head>
        <meta lang="es">
        <title>Ejercicio 3</title>
    </head>
    <body>
        <?php //Validaciones y f�rmulas
        //1� inicializamos las variables
        $dia=$diaTemp=$mesTemp=$YearTemp=$mes=$year=$edad=$errorG=$fechaCumple=$diffCumple=$errY=0;
        $cumple="";
        $datos=array();
        $fechaAct= date_create($time="now"); //create_date para el diff
        $YearToday=date("Y"); //de esta manera tenemos el a�o actual
        $MesCurso=date("m");
        $diaCurso=date("d");
     
      
        if($_SERVER["REQUEST_METHOD"]=="POST"){
            //Si todo va bien
            //verificamos que hay a�o
            if(empty($_POST["year"])){ //si el a�o esta vac�o
                $errY="No ha introducido un valor v�lido";
            }else{
                $YearTemp=$_POST["year"]; //lo alamcenamos en la variable temporal para seguir validando
                if($YearToday<=$YearTemp){
                    $errY=" El a�o es mayor o igual a la fecha actual, cambialo";
                }else{ //si hay a�o
                    $year=$_POST["year"];
                    //validaci�n de dia y mes
                   
                    if(empty($_POST["dia"])){//si el d�a est� vac�o
                        $dia=1; //le damos el valor de ohy
                    }else{
                        $dia=$_POST["dia"];
                    }
                      if(empty($_POST["mes"])){//si el d�a est� vac�o
                        $mes=1; //le damos el valor de ohy
                    }else{
                        $mes=$_POST["mes"];
                    }
                    //calculo de la edad
                    echo "la fecha introducida es ".$dia."-".$mes."-".$year."<br>";
                    $fechaCumple= date_create("".$year."-".$mes."-".$dia." 00:00:00"); //para el diff
                     $edad=$YearToday-$year;
                     echo "<hr><br>El usuario tiene ".$edad." a�os <br>";
                     
                     if($dia==$diaCurso && $mes==$MesCurso){
                         $cumple=" Felicidades, hoy es tu cumplea�os";
                     }else{
                         //primero crearemos los create_date para aplicar el diff
                         //diff
                         $diffCumple= date_diff( $fechaCumple, $fechaAct);
                         //ahora se realiza un forEach para almacenar los datos
                         foreach ($diffCumple as $valor){
                            $datos[]=$valor; //importantisimo introducir valores
                            //var_dump ($diffCumple);
                    }
$cumple= "Faltan ".$datos[1]." meses, ".$datos[2]."dias, ".$datos[3]." horas, ".$datos[4]." minutos y ".$datos[5]." segundos para su cumplea�os";

                     }
                     echo $cumple;
            
        }}}
        //funciones
        
        ?>
        <form name="formulario" action="<?PHP echo ($_SERVER["PHP_SELF"])?>" method="POST">
            <label> dia</label><!-- comment --><br>
            <input type="number" name="dia"><br>
         <label> Mes</label><!-- comment --><br>
            <input type="number" name="mes"><br> 
                <label> A�o*</label><!-- comment --><span class="error"><?php echo $errY?><br>
            <input type="number" name="year"><br>
                <span class="error"><br><!-- comment -->
                    <input type="submit">
        </form>
     
    </body>
</html>

