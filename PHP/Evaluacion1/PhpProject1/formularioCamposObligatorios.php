<html>
    <head>
        <title>Procesamiento del formulario</title>
        <style>
            .error {color: #FF0000;}
        </style>
    </head>
    <body>
        <!-- Valida la información del formulario -->
        <?php
            // Declaro las variables a utilizar
            $name = $email = $observaciones = $genero = "";
            $nameErr = $emailErr = $genderErr = "";
            
            // Vamos a formatear los datos que recojamos del formulario
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                if (empty($_POST["name"])) {
                    $nameErr = "El nombre es obligatorio";
                } else {
                    $name = verificar($_POST["name"]);
                }
                if (empty($_POST["email"])) {
                    $emailErr = "El email es obligatorio";
                } else {
                    $email = verificar($_POST["email"]);
                }
                $observaciones = verificar($_POST["observation"]);
                if (empty($_POST["gender"])) {
                    $genderErr = "El genero es obligatorio";
                } else {
                    $genero = verificar($_POST["gender"]);
                }
            }
            
            // Función de verificación
            function verificar($data) {
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
                return $data;
            }
        ?>
        
        <!-- Formulario en sí mismo -->
        <h1>Formulario de recogida de datos</h1>
        <p><span class="error">* campo obligatorio</span></p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
            Nombre: <input type="text" name="name" value="<?php echo $name?>">
            <span class="error">* <?php echo $nameErr;?></span>
            <br/>            
            E-mail: <input type="text" name="email" value="<?php echo $email?>">
            <span class="error">* <?php echo $emailErr;?></span>
            <br/>
            Observaciones: <textarea name="observation" rows="5" cols="40"></textarea><br/>
            Género:
            <input type="radio" name="gender" value="female" 
                   <?php if(isset($genero) && $genero=="female") echo "checked";?>>Female
            <input type="radio" name="gender" value="male" 
                <?php if(isset($genero) && $genero=="male") echo "checked";?>>Male
            <span class="error">* <?php echo $genderErr;?></span>
            <br/>
            <input type="submit">
        </form>
        
        <!-- Salida del formulario -->
        <h1>La salida de tu formulario es: </h1>
        <?php
            echo "Bienvenido a esta web ";
            echo $name."<br>";
            echo "Tu dirección de correo electrónico es: ";
            echo $email."<br>";
            echo "Tus observaciones son: ";
            echo $observaciones."<br>";
            echo "Eres ";
            echo $genero."<br>";
        ?>
    </body>
</html>