<html>
    <head>
        <title>Ejercicio 2 Formularios</title>
    </head>
    <body>
        <?php
        $nombre = $pas= "";
        $valido="*";
        $cadenaTexto="";
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $nombre=$_POST["name"];
            verificar($_POST["contraseña"]);
        }
        function verificar($pasword){
            global $valido;
            global $cadenaTexto;
            $regExp="/^(?=.*[A-Z])(?=.*[a-z])(?=.*[*.+_\-#])(?=.*\d)[A-Za-z\d*.+_\-#]{8,}$/";
            if (preg_match($regExp, $pasword)){
                $cadenaTexto= "La contraseña es robusta";                
            }else{
                $valido="La contraseña no cumple los requisitos";
                $cadenaTexto= "Error de contraseña<br>Ha de tener minimo 1 mayuscula, 1 minuscula, 1 numero y un caracter especial"; 
                
            }
        }
        ?>
        <h1>Introduce un usuario y contraseña</h1>
        <form action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?> method="POST">
            Nombre: <input type="texte" name="name" value="<?php echo $nombre ?>"><br><!-- comment -->
            Pasword: <input type="password" name="contraseña"><span class="error"><?php echo $valido;?></span><hr>
            <input type="submit">
        </form>
        <?php
            echo $cadenaTexto;
        
        ?>
        
        
    </body>
</html>
