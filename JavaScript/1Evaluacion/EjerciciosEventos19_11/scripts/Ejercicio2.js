document.addEventListener("mousemove", coordenadas);
document.addEventListener("keydown", tecla);
contenedor.addEventListener("mousedown", menejadorClicks);
//contenedor.addEventListener("mouseup", menejadorClicks);
contenedor.addEventListener("contextmenu", menejadorClicks);

function menejadorClicks(evento) {
    switch (evento.type) {
        case "contextmenu":
            cambioColor2(evento)
            break;
        case "mouseup":
            vuelveColor(evento)
            break;
        case "mousedown":
            cambioColor(evento)
            break;
    }
}

function cambioColor2(evento) {
    evento.preventDefault();
    if (evento.target.parentElement.id == "contenedor") {
        evento.target.style.background = "blue"
    } else
        evento.target.parentElement.style.background = "blue";

}


function cambioColor(evento) {
    if (evento.which == 1) {
        if (evento.target.parentElement.id == "contenedor") {
            evento.target.style.background = "yellow";
        } else
            evento.target.parentElement.style.background = "yellow";
    }
}
/* function vuelveColor(evento) {
    if (evento.target.parentElement.id == "contenedor") {
        evento.target.style.background = "white";
    } else
        evento.target.parentElement.style.background = "white";
} */

function tecla(evento) {
    let mensajeTecla = document.getElementById("teclaPulsada");
    let mensajeCodigo = document.getElementById("teclaCodigo");
    mensajeTecla.innerText = `Tecla: ${evento.key}`;
    mensajeCodigo.innerText = `Codigo: ${evento.keyCode}`;
}

function coordenadas(evento) {
    let mensajeX = document.getElementById("coordenadasX");
    let mensajeY = document.getElementById("coordenadasY");
    let x = evento.clientX;
    let y = evento.clientY;
    mensajeX.innerText = `${x}px X`;
    mensajeY.innerText = `${y}px Y`;
}