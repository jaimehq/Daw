//import { formulario, btnAgregar, btnMostrar } from "./datos.js";
let formulario = {
    nombre: document.getElementById("nombre"),
    telefono: document.getElementById("telefono")
}
let y;
let x;
let agenda;
let antiguaX, antiguaY;
let seleccion;
document.addEventListener("mousemove", movimiento);
//document.addEventListener("mousemove", mover)
//let btnAgregar=document.getElementById("agregar");
//let btnMostrar=document.getElementById("mostrar");
//esto quiero meterlo en un modulo
function eliminar() {
    if (seleccion.id === "columna") {
        let nombre = seleccion.innerText;
        nombre = nombre.split(/\s/)
        let arrayProvisional;
        arrayProvisional = agenda.filter((dato) => {
            return dato.nombre != nombre[0];
        })
        agenda = arrayProvisional;
        localStorage.setItem("agenda", JSON.stringify(agenda));
        seleccion.style.display="none"
    }

}


function mover(evento) {
    seleccion = evento.target.parentElement;
    antiguaY = seleccion.offsetTop
    antiguaX = seleccion.offsetLeft

}
function movimiento(evento) {
    x = evento.clientX;
    y = evento.clientY;

    if (seleccion.id == "columna") {
        seleccion.style.top = `${evento.clientY - antiguaY}px`;
        seleccion.style.left = `${evento.clientX - antiguaX}px`;
    }
    mostrarY.innerText = y;
    mostrarX.innerText = x

}
function guardar() {
    agenda = JSON.parse(localStorage.getItem("agenda"));
    debugger
    if (agenda == null) {
        agenda = [];
    }
    let contacto = {
        nombre: formulario.nombre.value,
        telefono: formulario.telefono.value
    }
    agenda.push(contacto);
    localStorage.setItem("agenda", JSON.stringify(agenda))
    formulario.nombre.value = "";
    formulario.telefono.value = "";

}
function mostrarAgenda() {
    let cadenaTexto = "";
    agenda = JSON.parse(localStorage.getItem("agenda"));
    if (agenda == null)
        cadenaTexto = "La agenda esta vacia"
    else {
        cadenaTexto = "<table id=\"mostrado\"><tr><th>Nombre</th><th>telefono</th></tr>"
        agenda.forEach(contacto => {
            cadenaTexto += `<tr id="columna"><td>${contacto.nombre}</td><td>${contacto.telefono}</td></tr>`
        });
        cadenaTexto += `<tr><td id="mostrarY">y</td><td id="mostrarX">x</td></tr>`
        cadenaTexto += "</table>";
    }
    mostrarTexto.innerHTML = cadenaTexto;
    mostrado.addEventListener("mousedown", mover);
    document.addEventListener("mousemove", movimiento);
    papeleraTabla.addEventListener("mousedown", eliminar);

}
document.getElementById("agregar").onclick = guardar;
mostrar.onclick = mostrarAgenda;