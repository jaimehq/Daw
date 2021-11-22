//1º declaracion de variables

//de esta forma guardamos los colores
let caja = document.querySelector("#cuadro");
let color1B = document.querySelector("#color1B");
let color2B = document.querySelector("#color2B");
let color3B = document.querySelector("#color3B");
let paleta = [color1B, color2B, color3B]; //paleta de colores
let TC1 = document.querySelector("#TC1");
let TC2 = document.querySelector("#TC2");
let TC3 = document.querySelector("#TC3");
let Titulos = [TC1, TC2, TC3];
let table = document.querySelector("table");
//para subirlo al localStorage, hay que convertir el objeto

document.querySelector("#guardarColores").onclick = function () {
  let color1 = document.getElementById("color1").value;
  let color2 = document.getElementById("color2").value;
  let color3 = document.getElementById("color3").value;
  let colores = [color1, color2, color3];
  alert(color1, color2, color3);
  localStorage.setItem("colores", JSON.stringify(colores));
};
document.querySelector("#mostrar").onclick = function () {
  let colorDescargar = JSON.parse(localStorage.getItem("colores"));
  let contador = 0;
  paleta.forEach((celda) => {
    celda.style.backgroundColor = `${colorDescargar[contador]}`;
    contador++;
  });
};
//PARTE DOM
let posicion = 0;
let marcado = false;
function verificar() {
  //funcion para verificarnos si está el fondo blanco o no
  /**
 * La he comentado porque daba multiples errores
 * paleta.forEach(celda => {
if(celda.style.backgroundColor=="white"){
    alert("Esta en blanco por lo que cancelamos eventos")
    table.removeEventListener("click", seleccionColorRaton,true);
    document.removeEventListener("keydown",seleccionColorTeclado,true);
    document.removeEventListener("keydown", pintar,true);//pintar el cuadrado
}
});}**/
}
table.addEventListener("click", seleccionColorRaton); //selección del color con el ratón
document.addEventListener("keydown", seleccionColorTeclado); //seleccion con el teclado
document.addEventListener("keydown", pintar); //pintar el cuadrado
function seleccionColorTeclado(evento) {
  //hacer que si es blanco no pueda seleccionar
  verificar();
  //recorrer array donde haremos la seleccion y si esta rojo marcamos true
  Titulos.forEach((T) => {
    if (T.style.backgroundColor == "red") {
      marcado = true;
    }
  });
  switch (true) {
    //ubicacion predetermianda
    case evento.key == "ArrowLeft" && marcado == false:
      posicion = 2;
      break;
    case evento.key == "ArrowRight" && marcado == false:
      posicion = 0;
      break;

    //Ubicacion deliberada
    case evento.key == "ArrowLeft" && marcado == true:
      Titulos[posicion].style.backgroundColor = "white";
      posicion--;
      if (posicion < 0) posicion = 2;
      break;
    case evento.key == "ArrowRight" && marcado == true:
      Titulos[posicion].style.backgroundColor = "white";
      posicion++;
      if (posicion > 2) posicion = 0;

      break;
  } //FIN DEL SWITCH
  if (posicion != null) {
    Titulos[posicion].style.backgroundColor = "red";
  }
} //fin function

function seleccionColorRaton(evento) {
  verificar();
  let colorCaja = evento.target.style.backgroundColor;
  caja.style.backgroundColor = colorCaja;
}
function pintar(evento) {
  verificar();
  if (evento.key == "Enter") {
    caja.style.backgroundColor = paleta[posicion].style.backgroundColor;
  }
}
