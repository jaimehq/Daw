<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <?php
    require_once("funciones.php");
    ?>
    <title>Tienda Online - Productos</title>
</head>

<body>
    <!-- Arrancamos sesión y comprobamos selección de tienda -->
    <?php
    session_start();
    if (!isset($_SESSION['username'])) {
        // Si no está loggeado, muestro mensaje de error y redirijo a login
        echo '<div class="position-absolute top-50 start-50 translate-middle"><h2>No has iniciado sesión</h2><p>Serás redirigido a la página de login en breves instantes...</p></div>';
        header("refresh:5; url=login.php");
        exit;
    }
    if (isset($_POST['tienda'])) {
        $_SESSION['tienda'] = $_POST['tienda'];
    }
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

    <!-- Listado productos -->

    <!-- Hay que listar todos los productos de la tabla stock listando las unidades de una sola tienda -->
    <!-- Cada fila de producto tendrá botón de añadir a la cesta -->
    <div class="container my-5">
        <div class="container mb-3">
            <!-- Tïtulo y selector de tienda -->
            <div class="row">
                <div class="col my-4">
                    <h2 class="fw-bold">Productos</h2>
                </div>
                <div class="col my-4">
                    <div class="input-group">
                        <label class="input-group-text" for="inputGroupSelect01">Tienda:</label>
                        <form action="<?php htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
                            <select class="form-select" id="inputGroupSelect01" name="tienda" onchange="this.form.submit()">
                                <option>Elije una tienda...</option>
                                <!-- Relleno con el contenido de la tabla tienda -->
                                <?php
                                $conexion = databaseConnect();
                                $sql = "SELECT cod, nombre FROM tienda";
                                try {
                                    foreach ($conexion->query($sql) as $row) {
                                        echo '<option value=' . strval($row[0]);
                                        if (isset($_SESSION['tienda']) && $_SESSION['tienda'] == strval($row[0])) {
                                            echo ' selected';
                                        }
                                        echo '>' . strval($row[1]) . '</option>';
                                    }
                                } catch (PDOException $e) {
                                    print $e->getMessage();
                                }
                                ?>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pinto tabla en función de la tienda -->
        <?php
        if (isset($_SESSION['tienda'])) {
            // Integro tabla dentro de formulario

            echo '<form action="' . $_SERVER["PHP_SELF"] . '" method="POST">';
            // Pinto cabecera tabla
            echo '<table class="table">';
            echo '<thead>';
            echo '<tr>';
            echo '<th scope="col">Código</th>';
            echo '<th scope="col">Nombre</th>';
            echo '<th scope="col">PVP</th>';
            echo '<th scope="col">Unidades</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';
            // Utilizo la conexión a la base de datos previa para hacer query
            $sqlProductsTable = 'SELECT s.producto, p.nombre_corto, p.PVP, s.unidades 
                                FROM stock s INNER JOIN producto p 
                                ON s.producto = p.cod
                                WHERE s.tienda = ' . $_SESSION["tienda"];
            try {
                foreach ($conexion->query($sqlProductsTable) as $row) {
                    echo '<tr>';
                    echo '<td>' . $row["producto"] . '</td>';
                    echo '<td>' . $row["nombre_corto"] . '</td>';
                    echo '<td>' . $row["PVP"] . '</td>';
                    echo '<td><input name="' . $row["producto"] . '#' . $row["nombre_corto"] . '#' . $row["PVP"] . '#' . $row["unidades"] . '" type="number" value="0" min="0" max="' . $row["unidades"] . '"/></td>';
                    echo '</tr>';
                }
            } catch (PDOException $e) {
                print $e->getMessage();
            }
            echo '</tbody>';
            echo '</table>';

            // Ahora los botones
            echo '<div class="container mt-5">';
            echo '<div class="row justify-content-center">';
            echo '<div class="col-4">';
            // Botón de Añadir a la cesta
            echo '<button type="submit" name="aLaCesta" class="btn btn-primary">Añadir a la cesta</button>';
            echo '</form>';
            echo '</div>';
            echo '<div class="col-4">';
            // Botón de vaciar cesta
            echo '<form action="' . $_SERVER["PHP_SELF"] . '" method="POST">';
            echo '<button type="submit" name="vaciarCesta" class="btn btn-primary">Vaciar cesta</button>';
            echo '</form>';
            echo '</div>';
            echo '<div class="col-4">';
            // Botón de previsualizar cesta
            echo '<div class="mb-4 text-center">';
            echo '<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Previsualizar cesta</button>';
            echo '</div>';
            echo '</div>';
            echo '</div>';
        }
        ?>
    </div>

    <!-- Aquí el proceso para vaciar la cesta -->
    <?php
    if (isset($_POST['vaciarCesta'])) {
        //echo "Vacío la cesta</br>";
        $_SESSION['cesta'] = array();
    }
    ?>

    <!-- Aquí proceso la creación/actualización de la cesta -->
    <?php
    if (isset($_POST['aLaCesta'])) {
        // Tengo que mover todos los productos que tengan unidades a la variable $_SESSION['cesta']
        // Si ya tengo la cesta con algún producto, tengo que chequear todos para añadir unidades a los repetidos
        foreach ($_POST as $key => $value) {
            if ($value != "0" && $value != "" && $value != NULL) {
                $temp2 = explode("#", $key);
                //var_dump(array_column($_SESSION['cesta'], 'cod'));
                $resultingKey = array_search($temp2[0], array_column($_SESSION['cesta'], 'cod'));
                //echo "El valor de \$resultingKey es: " . $resultingKey . "</br>";
                if ($resultingKey !== false) {
                    //echo "Aumento cantidad a producto existente</br>";
                    // Inserto nueva unidad en producto existente
                    if ($_SESSION['cesta'][$resultingKey]['quantity'] + intval($value) <= intval($temp2[3])) {
                        $_SESSION['cesta'][$resultingKey]['quantity'] += intval($value);
                    } else {
                        echo "No se puede añadir más unidades del producto con Código " . $_SESSION['cesta'][$resultingKey]['cod'] . " por falta de stock.</br>";
                    }
                } else {
                    //echo "Inserto nuevo producto</br>";
                    // Inserto nuevo producto
                    $temp['cod'] = $temp2[0];
                    $temp['name'] = str_replace("_", " ", $temp2[1]);
                    $temp['pvp'] = floatval(str_replace("_", ".", $temp2[2]));
                    $temp['quantity'] = intval($value);
                    // Añado el nuevo objeto al array de cesta
                    $_SESSION['cesta'][] = $temp;
                }
            }
        }
        //echo "<h3>Pinto \$_POST: </h3>";
        //var_dump($_POST);
        //echo "<h3>Pinto \$_SESSION: </h3>";
        //var_dump($_SESSION);
    }
    ?>


    <!-- Aquí quiero meter un offcanvas a la derecha que me muestre la cesta -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Cesta de productos</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <!-- Listado productos con precio y suma total -->
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Cod</th>
                        <th scope="col">Name</th>
                        <th scope="col">PVP</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $sumaProductos = 0;
                    $sumaCesta = 0;
                    foreach ($_SESSION['cesta'] as $producto) {
                        // Listo elemento de tabla
                        echo "<tr>";
                        echo "<td>" . $producto['cod'] . "</td>";
                        echo "<td>" . $producto['name'] . "</td>";
                        echo "<td>" . $producto['pvp'] . "</td>";
                        $sumaCesta += $producto['pvp'] * $producto['quantity'];
                        echo "<td>" . $producto['quantity'] . "</td>";
                        $sumaProductos += $producto['quantity'];
                        echo "</tr>";
                    }
                    ?>
                </tbody>
                <tfoot>
                    <th>Subtotal</th>
                    <th></th>
                    <th><?php echo $sumaCesta; ?></th>
                    <th><?php echo $sumaProductos; ?></th>
                </tfoot>
            </table>
            <?php
            // Botón de ir a cesta
            echo '<div class="mt-5">';
            echo '<form action="cesta.php" method="POST">';
            echo '<button type="submit" name="comprar" class="btn btn-primary">Comprar</button>';
            echo '</form>';
            echo '</div>';
            ?>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>