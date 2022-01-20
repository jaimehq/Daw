<html>
    <head>
        <title>Formulario</title>
    </head>
    <body>
        <!-- Valida la informacion -->
        <?php 
            $name = "";
            $email ="";  
            // vamos a formatear los datos que recojamos del formulario
            if($_SERVER["REQUEST_METHOD"]=="POST"){
                $name = verificar($_POST["name"]);
                $email = verificar($_POST["email"]);
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
        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="POST">
            Nombre: <input type="text" name="name"><br><!-- comment -->
            Email: <input type="text" name="email"><br><!-- comment -->
            <input type="submit"><!-- comment -->
            
        <!--Salida del formulario-->
        <?php 
            echo "<br>Bienvenido a esta web: ";
            echo $name."<br>";
            echo "Tu direccion de correo electronico es: ";
            echo $email."<br>"
        ?>
        </form>
    </body>
</html>
