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
botones.forEach((boton) => {
  boton.addEventListener("mousedown", pulsar);
  //boton.addEventListener("mousedown", mover);
  boton.addEventListener("mouseup", liberar);
  boton.addEventListener("mouseenter", entrar);
  boton.addEventListener("mouseout", salir);
  boton.addEventListener("click", seleccionMover);
  //si lo ponemos en la siguiente linea solo realiza la
  //accion si se clica en el boton
  //boton.addEventListener("contextmenu", pararMover);
  
});
document.addEventListener("contextmenu", pararMover);

function pararMover(evento){
    evento.preventDefault();
    document.removeEventListener("mousemove",moverBoton)
}
function alertar(evento) {
  evento.preventDefault();
  alert("Mensaje de aviso");
}
function entrar() {
  this.style.backgroundColor = "red";
}
function salir() {
  this.style.backgroundColor = "white";
}
function pulsar(evento) {
  this.style.color = "white";
  this.style.background = "black";
  this.style.bordercolor = "grey";
}
function liberar() {
  this.style.color = "black";
  this.style.background = "white";
  this.style.bordercolor = "black";
}
function moverBoton(evento) {
  let x = evento.clientX;
  let y = evento.clientY;
  boton.style.left = `${x}px`;
  boton.style.top = `${y}px`;
}
function seleccionMover() {
  boton = this;  
  document.addEventListener("mousemove", moverBoton);
}
