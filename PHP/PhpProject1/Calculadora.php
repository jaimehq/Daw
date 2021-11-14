
<<html>
    <head>
        <title>Calculadora</title>
    </head>
    <body>

 <?php
 
 $n1=$n2=$op=$opErr=$cont=0;
 $acum1=$acum2=$div1=$div2=0;
                 $numAm1=$numAm2=0;
                 $resultado="";
                 $perfect=0;
 //verificaci�n
 if($_SERVER["REQUEST_METHOD"]=="POST"){
     if(empty($_POST["op"])){
         $opErr="No ha introducido ning�n valor";
     }else{
         $n1=$_POST["n1"];
         $n2=$_POST["n2"];
         $op=$_POST["op"];
         echo "la operaci�n selecionada es ".$op;
         switch ($op) {
             case $op=="suma":
                 $resultado=($n1+$n2);
                 break;
             case $op=="primos":
                 
                 for ($index = 1; $index <=$n1; $index++) {
                     if($n1%$index==0){//si da resto 0
                         $cont++;
                     }
                 }
                 if($cont==2){
                     $resultado=$n1." es un numero primo";
                 }else{
                     $resultado=$n1." no es un numero primo";
                 }
                 break;
             case $op=="amigos":
                 //Dos n�meros son amigos si la suma de los divisores de uno (excepto el mismo) es igual al otro o viceversa
                 //220 y 284
                 $numAm1=false;$numAm2=false;
                 for ($index1 = 1; $index1 <=$n1; $index1++) {
                     $div1=$n1/$index1;
                     $acum1=$acum1+$div1;
                    
                 }
                 if($acum1===$n2){
                     $numAm1=true;
              
                 }else{
                     $numAm2=false;
                 }
                 
                  for ($index2 = 1; $index2 <=$n2; $index2++) {
                     $div2=$n2/$index2;
                     $acum2=$acum2+$div2;
                 }
                 if($acum2 === $n1){
                     $numAm2=true;
                 }else{
                     $numAm2=false;
                 }
                 if($numAm1 === true && $numAm2 === true){
                     $resultado=$n1." y ".$n2." son numeros amigos";
                 }else{
                        $resultado=$n1." y ".$n2." no son numeros amigos";
                 }
                 break;
             case $op=="perf":
                 //primero sacar los divisores y sumarlos y si da ese numero excluyendose �l mismo
                 
                 for ($index3 = 1; $index3<$n1; $index3++) {
                     echo $index3."vuelta <br>";
                     if($n1%$index3==0){ //si es divisible
                         echo" <br> ".$index3."ha entrado en el bucle<br>";
                         $perfect=$perfect+$index3;
                         echo "este es el acumulador ".$perfect."<br>";
                     }
                 }echo "acuumaldor total :  ".$perfect." y el valor n1 es ".$n1;
                 if($perfect == $n1){
                     $resultado=$n1." es un n�mero perfecto";
                 }else{
                         $resultado=$n1." no es un n�mero perfecto";
  
                 }
                 break;
             default:
                 break;
         }
     }
 }
 ?>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
            <label>Escriba un numero</label>
            <br><!-- -->
            <input type="number" name="n1"><br>
            <label>escriba otro numero </label><!-- comment -->
            <br> <input type="number" name="n2"><br>
            elija una opci�n <span class="error">*<?php echo $opErr ?><hr><br>
            Suma: <input type="radio" name="op" value="suma">
             Potencia: <input type="radio" name="op" value="Pot">
             Raiz Cuadrada <input type="radio" name="op" value="RC">
             Si son N� amigos <input type="radio" name="op" value="amigos">
             Si son primos <input type="radio" name="op" value="primos">
             Si son perfectos <input type="radio" name="op" value="perf"><br>
            <input type ="submit" value="enviar"> 
            </form>
        <?php
        echo "El resultado es ".$resultado;
        ?>
    </body>
</html>


