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
let botones=[boton1, boton2, boton3]=[...document.getElementsByTagName("td")];
botones.forEach(boton => {
    boton.addEventListener("mousedown",pulsar);
    boton.addEventListener("mousedown",mover);
    boton.addEventListener("mouseup",liberar);    
    boton.addEventListener("mouseenter",entrar);
    boton.addEventListener("mouseout",salir);
    boton.addEventListener("contextmenu",alertar);
});
function alertar(evento){
    evento.preventDefault();
    alert("Mensaje de aviso")
}
function entrar(){
    this.style.backgroundColor="red"
}
function salir(){
    this.style.backgroundColor="white"
}
function pulsar(evento){
    this.style.color="white";
    this.style.background="black";
    this.style.bordercolor="grey";
    
}
function liberar(){
    this.style.color="black";
    this.style.background="white";
    this.style.bordercolor="black";
}
function mover(evento){
    let x=evento.clientX;
    let y = evento.clientY;
    this.style.left=`${x}px`;
    this.style.top=`${y}px`;
}