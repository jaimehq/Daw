//creamos los tres botones
//let [boton1, boton2, boton3]=[...document.getElementsByTagName("td")];
//aplicamos eventos
/* boton1.addEventListener("mousedown",pulsar);
boton1.addEventListener("mouseup",liberar);
boton2.addEventListener("mousedown",pulsar);
boton2.addEventListener("mouseup",liberar);
boton3.addEventListener("mousedown",pulsar);
boton3.addEventListener("mouseup",liberar);
 */
let botones = ([boton1, boton2, boton3] = [
  ...document.getElementsByTagName("td"),
]);
let boton;
let tabla = document.querySelector("table");
tabla.addEventListener("mousedown", controladorEventos);
tabla.addEventListener("mouseup", controladorEventos);
tabla.addEventListener("mouseover", controladorEventos);
tabla.addEventListener("mouseout", controladorEventos);
tabla.addEventListener("click", controladorEventos);
document.addEventListener("contextmenu", controladorEventos);

function controladorEventos(evento) {
  switch (evento.type) {
    case "mouseup":
      liberar(evento);
      break;
    case "mousedown":
      pulsar(evento);
      break;
    case "mouseover":
      entrar(evento);
      break;
    case "mouseout":
      salir(evento);
      break;
    case "click":
      seleccionMover(evento);
      break;
    case "contextmenu":
      pararMover(evento);
      break;
  }
}

/* botones.forEach((boton) => {
  boton.addEventListener("mousedown", pulsar);
  //boton.addEventListener("mousedown", mover);
  boton.addEventListener("mouseup", liberar);
  boton.addEventListener("mouseenter", entrar);
  boton.addEventListener("mouseout", salir);
  boton.addEventListener("click", seleccionMover);
  //si lo ponemos en la siguiente linea solo realiza la
  //accion si se clica en el boton
  //boton.addEventListener("contextmenu", pararMover);
  
}); */
//let document.querySelector("table");

function pararMover(evento) {
  evento.preventDefault();
  document.removeEventListener("mousemove", moverBoton);
}
function alertar(evento) {
  evento.preventDefault();
  alert("Mensaje de aviso");
}
function entrar(evento) {
  evento.target.style.background = "red";
}
function salir(evento) {
  evento.target.style.background = "white";
}
function pulsar(evento) {
  evento.target.style.color = "white";
  evento.target.style.background = "black";
  evento.target.style.borderColor = "grey";
}
function liberar(evento) {
  evento.target.style.color = "black";
  evento.target.style.background = "white";
  evento.target.style.bordercolor = "black";
}
function moverBoton(evento) {
  let x = evento.clientX;
  let y = evento.clientY;
  boton.style.left = `${x}px`;
  boton.style.top = `${y}px`;
}
function seleccionMover(evento) {
  boton = evento.target;
  debugger
  //boton.style.position=absolute;
  document.addEventListener("mousemove", moverBoton);
}
