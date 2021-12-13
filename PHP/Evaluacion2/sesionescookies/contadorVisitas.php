<?php
if(session_start()){
    //contador de visitas
    if(isset($_SESSION['visitas'])){
        $_SESSION['visitas']++;
    }else{
        $_SESSION['visitas']=0;
    }
    echo'Has visitado la pagina '.$_SESSION['visitas'].' veces';
//en cada visita añadimos un valor al array
$_SESSION['misvisitas'][]=time();
foreach($_SESSION['misvisitas'] as $visita){
    echo date("d/m/y \a \l\a\s H:i:s", $visita)."<br>";
}

}

?>