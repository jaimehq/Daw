<?php

session_start();

if (!isset($_GET['controller']) || (isset($_GET['controller']) && empty($_GET['controller']))) {
    // Cargar la vista del index, la vista por defecto (indexView.php)
    $html = file_get_contents('./mvc/views/indexView.php');
    // Recuperar el contenido configurable para esa vista
    $html = str_replace('{titulo}', 'Blog MVC', $html);
} else {
    // Cargar un modelo y vista diferentes en función de los parámetros
    switch ($_GET['controller']) {
        case 'login':
            // Cargo la vista del formulario para el login
            $html = file_get_contents('./mvc/views/formView.php');
            // Cargo trocitos de HTML
            $formulario = file_get_contents('./site_media/html/loginForm.html');
            // Otras variables
            $action = './index.php?controller=usuario&action=checkUsuario';

            // Recuperar el contenido configurable para esa vista
            $html = str_replace('{titulo}', 'Blog MVC - Login', $html);
            $html = str_replace('{formulario}', $formulario, $html);
            $html = str_replace('{action}', $action, $html);
            break;

        case 'register':
            // Cargo la vista del formulario para el registro
            $html = file_get_contents('./mvc/views/formView.php');
            // Cargo trocitos de HTML
            $formulario = file_get_contents('./site_media/html/registrationForm.html');
            // Otras variables
            $action = './index.php?controller=usuario&action=registraUsuario';

            // Recuperar el contenido configurable para esa vista
            $html = str_replace('{titulo}', 'Blog MVC - Registration', $html);
            $html = str_replace('{formulario}', $formulario, $html);
            $html = str_replace('{action}', $action, $html);
            break;

        case 'usuario':
            // Cargo el modelo 'usuario'
            require_once './mvc/models/' . $_GET['controller'] . 'Model.php';
            // Llamar a la acción pasada por parámetro en el $_GET
            if (isset($_GET['action']) && !empty($_GET['action'])) {
                switch ($_GET['action']) {
                    case 'checkUsuario':
                        if (isset($_POST['username']) && isset($_POST['password'])) {
                            // Instancio un objeto del modelo que estoy cargando
                            $user1 = new Usuario($_POST['username'], $_POST['password']);
                            // Llamar al método checkUsuario
                            if ($user1->checkUsuario()) {
                                $html = "Estás autenticado en el sistema";
                                $_SESSION['username'] = $user1->getUsername();
                            } else {
                                $html = "Regresa a la página principal y regístrate!";
                            }
                            // Destruir objeto usuario
                            unset($user1);
                        }
                        break;
                    case 'registraUsuario':
                        if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['repassword'])) {
                            // Comparar contraseñas
                            if (strcmp($_POST['password'], $_POST['repassword']) == 0) {
                                // Registrar usuario nuevo en base de datos
                                $user1 = new Usuario($_POST['username'], $_POST['password']);
                                if ($user1->registraUsuario()) {
                                    $html = "Enhorabuena: estás registrado en el sistema";
                                } else {
                                    $html = "Hubo un error en el registro: el usuario ya existe. Regresa a la página principal y loguéate!";
                                }
                                // Destruir objeto usuario
                                unset($user1);
                            } else {
                                $html = "Las contraseñas no coinciden";
                            }
                        } else {
                            $html = "Prohibido acceder a esta URL directamente!";
                        }
                        break;
                }
            }
            break;

        case 'post':
            // Cargo el modelo 'usuario'
            require_once './mvc/models/postModel.php';
            // Llamar a la acción pasada por parámetro en el $_GET
            if (isset($_GET['action']) && !empty($_GET['action'])) {
                switch ($_GET['action']) {
                    case 'show':
                        // Compruebo que exista en la variable de sesión el nombre de usuario
                        if (isset($_SESSION['username'])) {
                            // Cargo la vista del formulario para el listado de posts
                            $html = file_get_contents('./mvc/views/formView.php');
                            // Cargo tantos posts como entradas tenga en la base de datos
                            $post1 = new Post();
                            $posts = $post1->getAllPostsFromDB();
                            $formulario = '';
                            if (!isset($_GET['numeroPost'])) {
                                $numeroPost = 1;
                            } else {
                                $numeroPost = $_GET['numeroPost'];
                            }
                            //ya no hace falta porque se elimina el boton
                            /* if ($numeroPost > count($posts)) {
                                $numeroPost = count($posts);
                            } */
                            //pos creo que esto es modificar con una varianble de forma que diga cuantos post hay que meter
                            for ($i = 0; $i < $numeroPost; $i++) {
                                $post = $posts[$i];
                                $temp = file_get_contents('./site_media/html/showPost.html');
                                $temp = str_replace('{titulo}', $post['title'], $temp);
                                $temp = str_replace('{texto}', $post['text'], $temp);
                                $temp = str_replace('{autor}', $post['author'], $temp);
                                $temp = str_replace('{fechaPublicacion}', $post['publicationDate'], $temp);
                                // Añadimos este post al resto para luego pintarlos todos
                                $formulario = $formulario . $temp;
                            }
                            if (($numeroPost + 1) <= count($posts)) {
                                $botoncin = file_get_contents('./site_media/html/botonContinuarLeyendo.html');
                                $botoncin = str_replace('{numeroPost}', $numeroPost + 1, $botoncin);
                                $formulario = $formulario . $botoncin;
                            }
                            $html = str_replace('{titulo}', 'Blog MVC - Posts', $html);
                            $html = str_replace('{formulario}', $formulario, $html);
                            unset($post1);
                        } else {
                            $html = "Permiso denegado. Loguéate para poder acceder a esta página";
                        }
                        break;

                    case 'write':
                        // Compruebo que exista en la variable de sesión el nombre de usuario
                        if (isset($_SESSION['username'])) {
                            // Cargo la vista del formulario para el listado de posts
                            $html = file_get_contents('./mvc/views/formView.php');
                            // Cargo el formulario de escritura de un nuevo post
                            $formulario = file_get_contents('./site_media/html/writePost.html');
                            // Otras variables
                            $action = './index.php?controller=post&action=post';
                            // Reemplazo los campos configurables
                            $html = str_replace('{titulo}', 'Blog MVC - Write post', $html);
                            $html = str_replace('{formulario}', $formulario, $html);
                            $html = str_replace('{action}', $action, $html);
                        } else {
                            $html = "Permiso denegado. Loguéate para poder acceder a esta página";
                        }
                        break;

                    case 'post':
                        // Compruebo que exista en la variable de sesión el nombre de usuario
                        if (isset($_SESSION['username'])) {
                            if (isset($_POST['title']) && isset($_POST['body'])) {
                                // Cargo el modelo de autor
                                require_once './mvc/models/authorModel.php';
                                // Primero debo registrar, si no está ya registrado, a este usuario como autor
                                $author1 = new Author($_SESSION['username']);
                                $author1->registerAuthor();
                                // Creo un nuevo objeto de Post que voy a usar para escribir en BD
                                $post1 = new Post();
                                $post1->setTitle($_POST['title']);
                                $post1->setText($_POST['body']);
                                $post1->setAuthor($author1->getId());
                                $post1->setPublicationDate(date("Y-m-d H:i:s"));
                                if ($post1->publishPost()) {
                                    $html = "Enhorabuena: acabas de publicar un nuevo post";
                                } else {
                                    $html = "Hubo un error en la publicación: no se ha podido publicar";
                                }
                                // Destruir objeto usuario
                                unset($author1);
                                unset($post1);
                            } else {
                                $html = "Prohibido acceder a esta URL directamente!";
                            }
                        } else {
                            $html = "Permiso denegado. Loguéate para poder realizar esta acción";
                        }
                        break;
                }
            }
            break;
    }
}

// Devuelvo vista
echo $html;
