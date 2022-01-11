//declaramos las dos estructuras que habra dentro de cada clave
let direccion = {
    calle: "",
    poblacion: "",
    provincia: ""
}
let telefonos = [];
//la funcion agregar realizara lo solicitado por el ejercicio
function agregar() {
    //primero se coge el nombre que nos servira de clave mas adelante
    let nombre = document.getElementById("nombre").value;
    //asignamos los distintos valores a los campos de direccion
    direccion.calle = document.getElementById("calle").value;
    direccion.provincia = document.getElementById("provincia").value;
    direccion.poblacion = document.getElementById("poblacion").value;
    //creamos las tres variables que despues crearan el array de telefonos
    let movil = document.getElementById("movil").value;
    let casa = document.getElementById("casa").value;
    let trabajo = document.getElementById("trabajo").value;
    telefonos = [movil, casa, trabajo];
    //una vez adquiridos todos los datos se meten en el local storage si el campo nombre no esta vacio
    if (nombre != "") {
        localStorage.setItem(nombre, JSON.stringify({ direccion, telefonos }));
        //y vaciamos los campos del formulario
        document.getElementById("nombre").value = "";
        document.getElementById("calle").value = "";
        document.getElementById("provincia").value = "";
        document.getElementById("poblacion").value = "";
        document.getElementById("movil").value = "";
        document.getElementById("casa").value = "";
        document.getElementById("trabajo").value = "";
    }else{
        //en caso contrario mostramos un mensaje alertando al usuario
        alert("El campo nombre es obligatorio completelo si desea guardar la informacion");
    }
}
//creamos la funcion buscar
function buscar() {
    //capturamos el nombre para poder buscar la clave
    let nombre = document.getElementById("nombre").value;
    //asignamos a la estructura de datos contacto la informacion obtenida mediante la clave
    let contacto = JSON.parse(localStorage.getItem(nombre));
    //capturamos el objeto salidaTexto para modificarlo mas adelante
    let salida = document.getElementById("salidaTexto");
    //se crea una estructura con una tabla practicamente igual a la del formulario pero con los datos obtenidos
    let cadena = `<table cellspacing="0" width="60%">
    <tr>
        <th colspan="3">INFORMACION PERSONAL</th>
    </tr>
    <tr>
        <td colspan="3">Nombre:</td>
    </tr>
    <tr>
        <td colspan="3">
            ${nombre}
        </td>
    </tr>
    <tr>
        <th colspan="3">DOMICILIO</th>
    </tr>
    <tr>
        <td>Calle, nº, piso</td>
        <td>Población</td>
        <td>Provincia</td>
    </tr>
    <tr>
        <td>${contacto.direccion.calle}</td>
        <td>${contacto.direccion.poblacion}</td>
        <td>${contacto.direccion.provincia}</td>
    </tr>
    <tr>
        <th colspan="3">TELEFONOS</th>
    </tr>
    <tr>
        <td>Movil</td>
        <td>Casa</td>
        <td>Trabajo</td>
    </tr>
    <tr>
        <td>${contacto.telefonos[0]}</td>
        <td>${contacto.telefonos[1]}</td>
        <td>${contacto.telefonos[2]}</td>
    </tr>
</table>`;
//una vez creada la estructura la mostramos y vaciamos el campo de nombre
    document.getElementById("nombre").value = "";
    salida.innerHTML = cadena;
}
document.getElementById("agregar").onclick = agregar;
document.getElementById("buscar").onclick = buscar;