<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sesiones</title>
</head>
<body>
<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //session_start();
    session_unset();

}



//if(session_start()){
    //contador de visitas
    if(isset($_SESSION['visitas'])){
        $_SESSION['visitas']++;
    }else{
        $_SESSION['visitas']=0;
    }
   
//en cada visita añadimos un valor al array
$_SESSION['misvisitas'][]=array(time(), $_SESSION['visitas']);
foreach($_SESSION['misvisitas'] as $visita){
    echo 'Visita nº: '.$visita[1].' se realizo a las :';
    echo date("d/m/y \a \l\a\s H:i:s", $visita[0])."<br>";
}

//}

?>
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

<input type="submit">

</form>
</body>
</html>


