<html>
    <head>
        <title>Formulario clase 2</title>
        <style>
            .error{
                color:#ff3333;
            }
            
        </style>
    </head>
    <body>
        <!-- Valida la informacion -->
        <?php 
            $name = "";
            $email ="";
            $observaciones=$genero="";
            $nameErr = $emailErr = $generoErr ="";
            // vamos a formatear los datos que recojamos del formulario
            if($_SERVER["REQUEST_METHOD"]=="POST"){
                if(empty($_POST["name"])){
                    $nameErr="El nombre es obligatorio";
                }else{
                    $name = verificar($_POST["name"]);
                }
                if(empty($_POST["email"])){
                    $emailErr="El email es obligatorio";
                }else{
                    $email = verificar($_POST["email"]);
                }
                if(empty($_POST["genero"])){
                    $generoErr="El genero es obligatorio";
                }else{
                    $genero = verificar($_POST["genero"]);
                }                
                $observaciones = verificar($_POST["observation"]);
                
            }
            
            //funcion de verificar;
            function verificar($data){
                $data=trim($data);
                $data= stripcslashes($data);
                $data= htmlspecialchars($data);
                return $data;
            }
        ?>
        <!-- Formulario en si en html -->
        <h1>Formulario de recogida de datos</h1>
        <p><span class="error">* campo obligatorio</span></p>
        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="POST">
            Nombre: <input type="text" name="name">
            <span class="error">*<?php echo $nameErr;?></span>
            <br><!-- comment -->
            Email: <input type="text" name="email">
            <span class="error">*<?php echo $emailErr;?></span><br><!-- comment -->
            Observaciones: <textarea name="observation" rows="5" cols="40"></textarea><br>
            Genero: <input type="radio" name="genero" value="Mujer">Mujer
            <input type="radio" name="genero" value="Hombre">Hombre
            <span class="error">*<?php echo $generoErr;?></span>
            <br>
            <input type="submit"><!-- comment -->
            <hr>
        <!--Salida del formulario-->
        <?php 
            echo "<br>Bienvenido a esta web: ";
            echo $name."<br>";
            echo "Tu direccion de correo electronico es: ";
            echo $email."<br>";
            echo 'Tus observaciones son: ';
            echo $observaciones."<br>";
            echo "Eres: ";
            echo $genero."<br>";
        ?>
        </form>
    </body>
</html>
