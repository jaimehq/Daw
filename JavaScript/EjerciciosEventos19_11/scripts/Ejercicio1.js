//solo tiene una celda asique como pide delegacion de eventos
//vamos a capturar todos desde el elemento tabla
tabla.addEventListener("mousedown", cambioLetras);
tabla.addEventListener("mousedown", cambioColor);
tabla.addEventListener("mouseup", volverColor);
tabla.addEventListener("mouseover", mostrarMensaje);

function mostrarMensaje(event) {
    if (event.target.innerText != "PULSADO") {
        let mensaje = document.getElementById("mensaje");
        mensaje.style.opacity = 1
        //con esta linea el mensaje se mueve solo cuando tenemos el puntero sobre el boton

        //event.target.addEventListener("mousemove",ubicacion);
        //debugger
        //al aplicar el evento de escucha al dom el mensaje se mostrara hasta que lo pulsemos
        document.addEventListener("mousemove", ubicacion);
    }
}
function ubicacion(event) {
    let x = event.clientX;
    let y = event.clientY;
    mensaje.style.left = `${x}px`;
    mensaje.style.top = `${y}px`;
}

function cambioLetras(event) {
    let boton = event.target;
    //debugger
    boton.innerText = "PULSADO"
}
function cambioColor(event) {
    let boton = event.target;
    //debugger    
    boton.style.backgroundColor = "black";
    boton.style.color = "white";
    let mensaje = document.getElementById("mensaje");
    mensaje.style.opacity = 0;
}
function volverColor(event) {
    let boton = event.target;
    //debugger    
    boton.style.backgroundColor = "white";
    boton.style.color = "black"
}

