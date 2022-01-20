<html>
    <head>
        <title>Ejercicio 2 Formularios</title>
        <style>
            .error{
                color: red;
            }
            </style>
    </head>
    <body>
        <?php
        //Jaime Hernansanz Quevedo
        
        //inicializamos todas las variables
        $todoCorrecto=$nombre = $dni=  $edad=$altura=$telefono="";
        $errNombre=$errDni=$errAltura=$errEdad=$errTelefono="*";
        $cadenaTexto="";
        //una vez damos a enviar empezamos con las verificaciones y asignaciones
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $errNombre=$errDni=$errAltura=$errEdad=$errTelefono="*";
            $nombre=verificarNombre($_POST["name"]);
            //si el campo al verificar nos lo ha devuelto vacio se lo comunicaremos al usuario
            //todas las asignaciones y verificaciones estan realizadas de la misma forma
            if ($nombre=="")
                $errNombre= "El nombre solo puede albergar caracteres";
            $dni=verificarDni($_POST["dni"]);
            if ($dni=="")
                $errDni= "El DNI solo puede tener 9 numeros y una letra";
            $edad=verificarEdad($_POST["edad"]);
            if ($edad=="")
                $errEdad= "La edad ha de comprender entre 0 y 120 inclusives";
            $altura=verificarAltura($_POST["altura"]);
            if ($altura=="")
                $errAltura= "La altura ha de estar comprendida entre 0 y 250cm";
            $telefono= verificarTelefono($_POST["telefono"]);
            if ($telefono=="")
                $errTelefono= "Los telefonos han de empezar por 6, 7, 8, 9 y tener 9 digitos en total";
            //si todos los valores son correctos vaciamos el formulario y se lo mostramos al usuario
            if($errNombre=="*" && $errDni=="*"&& $errAltura== "*"&& $errEdad== "*"&& $errTelefono="*"){
                $todoCorrecto="El formulario no tiene errores";
                $nombre = $dni=  $edad=$altura=$telefono="";
            }
        }
        //creamos una funcion para verificar cada campo de la forma que pide el enunciado
        //todos funcionaran igual, si el campo no es correcto se devolvera el valor vacio
        function verificarNombre($nom){            
            $regNom="/^[A-Z\s]+$/i";
            if (!preg_match($regNom, $nom)){                
                $nom="" ;               
            }
            return $nom;
        }
        function verificarDni($dni){            
            $regDni="/[0-9]{8}[A-Za-z]/";
            if (!preg_match($regDni, $dni)){                
                $dni="" ;               
            }
            return $dni;
        }
        function verificarEdad($edad){ 
            if ($edad<0 || $edad>120){
                $edad="" ;               
            }
            return $edad;
        }
        function verificarAltura($alt){  
            if ($alt<0 || $alt>250){                
                $alt="" ;               
            }
            return $alt;
        }
        function verificarTelefono($tel){            
            $regTel="/[6789]\d{8}/";//no sabia que habia moviles que empezaran por 8
            if (!preg_match($regTel, $tel)){
                $tel="" ;               
            }
            return $tel;
        }
        ?>
        <h1>Introduce un usuario y contraseña</h1>
        <form action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?> method="POST">
            Nombre y apellidos: <input type="text" name="name" value="<?php echo $nombre ?>"><span class="error"><?php echo $errNombre;?></span><br><!-- comment -->
            DNI: <input type="text" name="dni" value="<?php echo $dni ?>"><span class="error"><?php echo $errDni;?></span><br>
            Edad: <input type="number" name="edad" value="<?php echo $edad ?>"><span class="error"><?php echo $errEdad;?></span><br><!-- comment -->
            Altura(cm): <input type="number" name="altura" value="<?php echo $altura;?>"><span class="error"><?php echo $errAltura;?></span><br>
            Telefono: <input type="number" name="telefono" value="<?php echo $telefono;?>"><span class="error"><?php echo $errTelefono;?></span><hr>
            <input type="submit"><span><?php echo $todoCorrecto;?></span>
        </form>
        <?php
            
        
        ?>
        
        
    </body>
</html>
