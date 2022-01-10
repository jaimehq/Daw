<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <title>Tienda Online - Pagar</title>
</head>
<body>
    <!-- Arrancamos sesión -->
    <?php
        session_start();
    ?>

    <!-- navbar -->
    <nav class="navbar navbar-expand-md navbar-light">
        <div class="container-xxl">
            <a href="<?php htmlspecialchars($_SERVER['PHP_SELF']);?>" class="navbar-brand">
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
                    if (isset($_SESSION['username']))
                    {
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

    <!-- pagar -->
    <?php
    // TODO Aquí habría que comunicar con la base de datos para descontar los productos que estamos comprando
    // Es en la comunicación con la base de datos donde verificamos que hay stock y decidimos qué hacer:
        // A. Avisar de que no hay stock de algún producto que queremos comprar.
    // Destroy the cart content
    $_SESSION['cesta'] = array();
    // Inform the user
    echo '<div class="position-absolute top-50 start-50 translate-middle"><h2>La compra se ha realizado con éxito</h2><p>Tu carrito se ha vaciado.</p></div>';
    ?>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>