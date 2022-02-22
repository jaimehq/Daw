<?php
require_once './classes/Usuario.php';
?>

<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <!-- Gestionar la verificación del usuario -->
        <?php
        // Verificar que se ha hecho clic en el botón de login
        if (isset($_POST['username']) && isset($_POST['password'])) {
            // Crear objeto de la clase usuario
            $user1 = new Usuario($_POST['username'], $_POST['password']);
            // Chequear usuario en base de datos
            if ($user1->checkUsuario('username', 'password', 'autenticacion')) {
                // Muestro el echo
                echo "Estás autenticado en el sistema";
            }
        }
        ?>

        <!-- Formulario -->
        <form action="<?php $_SERVER['PHP_SELF'] ?>" method="POST">
            Nombre de usuario:
            <input type="text" name="username" />
            <br><br>
            Contraseña:            
            <input type="password" name="password" />
            <button type="submit" value="login">Log in</button>
        </form>

    </body>
</html>

