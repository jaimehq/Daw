import { formulario as formulario} from "./form.js";
let persona = {};
/* let formulario = {
    nombre: document.getElementById("nombre"),
    apellido: document.getElementById("apellido1"),
    localidad: document.getElementById("poblacion"),
    provincia: document.getElementById("provincia"),
    salida: document.getElementById("salidaTexto")
};  */
function capturarArrayLocal() {

    let listado = JSON.parse(localStorage.getItem("listado"));
    if (listado == null)
        listado = [];
    persona.nombre = formulario.nombre.value;
    persona.apellido = formulario.apellido.value;
    persona.localidad = formulario.localidad.value;
    persona.provincia = formulario.provincia.value;
    listado.push(persona);
    //creamos una funcion para ordenar por nombre
    listado.sort(function (a,b){
        if(a.nombre > b.nombre){
            return 1;
        }else{
            return -1;
        }
       
    });
    //limpiamos el formulario
    formulario.nombre.value="";
    formulario.apellido.value="";
    formulario.localidad.value="";
    formulario.provincia.value="";
    localStorage.setItem("listado", JSON.stringify(listado));
}
function listarArrayLocal() {
    let listado = JSON.parse(localStorage.getItem("listado"));
    crearTabla(listado);

}
function crearTabla(array) {
    let cadena = "";
    if (array == null) {
        formulario.salida.innetHTML = "El listado no tiene ningun registro";
    }
    else {
        cadena = "<table><tr><th>Nombre</th><th>Apellido</th><th>Localidad</th><th>Provincia</th></tr>"
        array.forEach(element => {
            cadena += `<tr><td>${element.nombre}</td><td>${element.apellido}</td><td>${element.localidad}</td><td>${element.provincia}</td></tr>`
        });
        cadena += "</table>";
        formulario.salida.innerHTML = cadena;
    }
}
function borrarArrayLocal() {
    let listado = JSON.parse(localStorage.getItem("listado"));
    let listaFiltrada = [];
    if (listado == null || formulario.nombre.value=="")
        formulario.salida.innetHTML = "Esta accion no se puede realizar";
    else {
        listaFiltrada = listado.filter((registro) => {
            return registro.nombre != formulario.nombre.value;
        });
        localStorage.setItem("listado", JSON.stringify(listaFiltrada));
    }
}
function buscarArrayLocal() {
    let listado = JSON.parse(localStorage.getItem("listado"));
    let listaFiltrada = [];
    if (listado == null)
        formulario.salida.innetHTML = "El listado esta vacio";
    else {
        listaFiltrada = listado.filter((registro) => {
            return registro.nombre === formulario.nombre.value;
        });
        crearTabla(listaFiltrada);
    }
}

document.getElementById("btnagregar").onclick = capturarArrayLocal;
document.getElementById("btnListar").onclick = listarArrayLocal;
document.getElementById("btnBuscar").onclick = buscarArrayLocal;
document.getElementById("btnBorrar").onclick = borrarArrayLocal;