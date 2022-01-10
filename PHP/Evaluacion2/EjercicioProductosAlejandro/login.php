<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <title>Tienda Online - Login</title>
</head>

<body>

    <!-- Import functions -->
    <?php
    require_once('funciones.php');
    ?>

    <!-- Form validation -->
    <?php
    // Variables
    $username = '';
    $password = '';
    $usernameEmptyErr = '';
    $passwordEmptyErr = '';
    $authenticationErr = '';
    // If the POST variable is set...
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // TODO: check fields are not empty
        if (empty($_POST['username'])) {
            $usernameEmptyErr = 'El nombre de usuario no puede dejarse en blanco';
        } else {
            if (empty($_POST['password'])) {
                $passwordEmptyErr = 'La contraseña no puede dejarse en blanco';
            } else {
                // Fill variables
                $username = $_POST['username'];
                $password = $_POST['password'];

                // Connect to database
                $conexion = databaseConnect();

                // Comprobar que el usuario y contraseña son correctos y mostrar
                if (authentication($conexion, $_POST['username'], $_POST['password'])) {
                    header('Location: productos.php');
                } else {
                    $authenticationErr = 'El nombre de usuario o la contraseña no son válidos';
                }
            }
        }
    }
    ?>

    <!-- Arrancamos sesión -->
    <?php
    session_start();
    ?>

    <!-- navbar -->
    <nav class="navbar navbar-expand-md navbar-light">
        <div class="container-xxl">
            <a href="<?php htmlspecialchars($_SERVER['PHP_SELF']); ?>" class="navbar-brand">
                <span class="fw-bold text-secondary">
                    <i class="bi bi-cart4"></i>
                    DWES - Tienda Online
                </span>
            </a>
            <!-- toggle button for mobile nav -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- navbar links -->
            <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="productos.php" class="nav-link">Productos</a>
                    </li>
                    <li class="nav-item">
                        <a href="cesta.php" class="nav-link">Cesta</a>
                    </li>
                    <?php
                    if (isset($_SESSION['username'])) {
                        echo '<li class="nav-item">';
                        echo '<a href="logoff.php" class="nav-link">Logoff</a>';
                        echo '</li>';
                    } else {
                        echo '<li class="nav-item">';
                        echo '<a href="login.php" class="nav-link">Login</a>';
                        echo '</li>';
                    }
                    ?>
                </ul>
            </div>

        </div>
    </nav>

    <!-- login form -->
    <section id="login">
        <div class="container-lg my-5">
            <div class="text-center">
                <h2>Login</h2>
            </div>

            <div class="row justify-content-center my-5">
                <div class="col-5">
                    <form action="<?php htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
                        <label for="username" class="form-label">Nombre de usuario:</label>
                        <div class="mb-4 input-group">
                            <span class="input-group-text">
                                <i class="bi bi-person-fill"></i>
                            </span>
                            <input type="text" class="form-control" id="username" name="username" value="<?php $username; ?>" required>
                            <!-- tooltip -->
                            <span class="input-group-text">
                                <span class="tt" data-bs-placement="top" title="Introduce tu nombre de usuario">
                                    <i class="bi bi-question-circle text-muted"></i>
                                </span>
                            </span>
                        </div>

                        <label for="password" class="form-label">Contraseña:</label>
                        <div class="mb-4 input-group">
                            <span class="input-group-text">
                                <i class="bi bi-lock-fill"></i>
                            </span>
                            <input type="password" class="form-control" id="password" name="password" value="<?php $username; ?>" required>
                            <!-- tooltip -->
                            <span class="input-group-text">
                                <span class="tt" data-bs-placement="top" title="Introduce tu contraseña">
                                    <i class="bi bi-question-circle text-muted"></i>
                                </span>
                            </span>
                        </div>

                        <!-- Aquí muestro el $authenticationErr -->
                        <label class="form-label text-danger"><?php echo $authenticationErr; ?></label>

                        <div class="mb-4 text-center">
                            <input type="submit" class="btn btn-primary" value="Login" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <!-- For tooltips -->
    <script>
        const tooltips = document.querySelectorAll('.tt')
        tooltips.forEach(t => {
            new bootstrap.Tooltip(t)
        })
    </script>
</body>

</html>