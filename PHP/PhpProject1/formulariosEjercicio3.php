<html>
    <head>
        <title>Ejercicio 3 de formularios</title>
    </head>
    <body>
        <!<!-- Jaime Hernansanz -->
        <?php   
        $anoError=$diaError=$mesError="";
        $dia=$mes=$anno="";
        $valido=false;
        $horaActual= date("G", time());
        $segActual= date("s", time());
        $minActual= date("i", time());
        $diaActual=date("d",time());
        $mesActual=date("m",time());
        $annoActual= date("Y", time());
        if ($_SERVER["REQUEST_METHOD"]=="POST"){            
            $anoError=$diaError=$mesError="";
            $anno=$_POST["ano"];            
            if(empty($_POST["dia"])){
                $valido=true;
                if($dia!=0)
                    $dia=1;
            }else{
                $dia=$_POST["dia"];
                $valido=true;
            }
            if(empty($_POST["mes"])){
                $valido=true;
                if($mes!=0)
                    $mes=1;
            }else{
                $mes=$_POST["mes"];
                $valido=true;
            }
            if($mes<1 || $mes>12){
                $mesError="El mes tiene que ser de 1 a 12, no hay mas meses en un año";
                $valido=false;
            }
            
            if($dia<1 || $dia>31 || $dia==0){
                $diaError="El dia no es valido, ningun mes tiene esos dias";
                $valido=false;
            }
            switch ($mes) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:                    
                    if($dia<1 || $dia>31){
                        $diaError="El dia no es valido, mira a ver cuantos dias tiene ese mes...";
                        $valido=false;
                    }
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if($dia<1 || $dia>30){
                        $diaError="El dia no es valido, mira a ver cuantos dias tiene ese mes...";
                        $valido=false;
                    }
                    break;
                case 2:
                    if($dia<1 || $dia>28){
                        $diaError="El dia no es valido, mira a ver cuantos dias tiene ese mes...";
                        $valido=false;
                    }
                    if($dia==29){
                        $diaError="No se si sera bisiesto ese año...";
                        $valido=true;
                    }
                    break;
                default :
                    $diaError="El mes no es valido";                    
                    $valido=false;
            }
            
            if($valido==true){
                if($dia==$diaActual && $mes==$mesActual){
                    $cadenaCaracter= "FELICIDADES";
                }            
                else{
                    
                    $horaActual=$hIntroducida="";
                    $hActual= date_create("now");
                    $hIntroducida= date_create( $annoActual."-".$mes."-".$dia);
                    $intervalo= date_diff($hActual, $hIntroducida);
                    $dias= ($intervalo->days)%365;
                    $h=$intervalo->h;
                    $m=$intervalo->i;
                    $s=$intervalo->s;
                    if($hActual>$hIntroducida){
                        $cadenaCaracter ="El tiempo que falta para tu cumple es: ".(365-$dias)."dias ".$h." horas "." ".$m." minutos y ".$s." segundos";
                    }else{
                        $cadenaCaracter = "El tiempo que falta para tu cumple es: ".$dias."dias ".$h." horas "." ".$m." minutos y ".$s." segundos";
                    }
                    
                }
            }
        }
        ?>
        <h3>Introduce tu fecha de nacimiento</h3>
        <form action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?> method="POST">
            Dia<input name="dia" type="number"><span class="error"><?php echo $diaError?></span><br>
            Mes<input name="mes" type="number"><span class="error"><?php echo $mesError?></span><br>
            Año<input name="ano" type="number" required><span class="error"><?php echo $anoError?></span><br>     
            <input type="submit" value="Submit">
        </form>
        <?php
            echo $cadenaCaracter;        
        ?>
        
    </body>
</html>
