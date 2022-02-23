<?php

// Creamos las funciones de validación, que van a ser llamadas
// desde JavaScript
function validarNombre($nombre) {
    if (strlen($nombre) < 4)
        return false;
    return true;
}

function validarEmail($email) {

    return preg_match("/^[a-z0-9]+([_\\.-][a-z0-9]+)*@([a-z0-9]+([\.-][a-z0-9]+)*)+\\.[a-z]{2,}$/i", $email);
}

function validarPasswords($pass1, $pass2) {
    return $pass1 == $pass2 && strlen($pass1) > 5;
}

function validarFormulario($valores) {
    $respuesta = array();
    if (!validarNombre($valores['nombre']))
        $respuesta['errorNombre'] = "El nombre debe tener más de 3 caracteres.";
    if (!validarPasswords($valores['password1'], $valores['password2']))
        $respuesta['errorPassword'] = "La contraseña debe ser mayor de 5 caracteres o no coinciden.";
    if (!validarEmail($valores['email']))
        $respuesta['errorEmail'] = "La dirección de email no es válida.";
    return $respuesta;
}

echo json_encode(validarFormulario($_REQUEST));
?>