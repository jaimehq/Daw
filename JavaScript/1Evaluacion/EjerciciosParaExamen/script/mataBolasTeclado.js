btnMouse.onclick = guardarNombre;
btnTeclado.onclick = guardarNombreTeclado;

let nivel = 1;
let bola = document.querySelector("img");
let intervalo, intervaloCaer, comprobarPosicion;
let usuario;
let puntuacion;

function comprobar() {
  if (
    bola.offsetTop >= barra.offsetTop &&
    bola.offsetLeft >= barra.offsetLeft - 10 &&
    bola.offsetLeft <= barra.offsetLeft + 80
  ) {
    clearInterval(intervalo);
    sumarPuntos();
  }
}

function moverBarra(evento) {
  //debugger
  let x = barra.offsetLeft;
  switch (true) {
    case evento.keyCode === 37:
      if (x > 0) {
        x -= 15;
        barra.style.left = `${x}px`;
      }
      break;
    case evento.keyCode === 39:
      if (x < window.innerWidth - 80) {
        x += 15;
        barra.style.left = `${x}px`;
      }
      break;
  }
}
function guardarNombreTeclado(evento) {
  document.addEventListener("keydown", moverBarra);
  comprobarPosicion = setInterval(comprobar, 2);
  barra.style.visibility = "visible";
  barra.style.top = `${window.innerHeight - 80}px`;
  barra.style.left = `${window.innerWidth / 2}px`;

  usuario = nombreI.value;
  puntuacion = 0;

  score.style.visibility = "visible";
  nombre.style.visibility = "hidden";

  scoreActual.innerHTML = `Usuario=${usuario}<br>${puntuacion}`;

  intervalo = setInterval(moverBarra, 1, evento);
  creacionBolas();
  mostrarRanking();
  nombreI.value = "";
}
//lo primero que va a hacer la pagina es solicitar el nombre de usuario para empezar el juego
function guardarNombre() {
  bola.addEventListener("mousedown", sumarPuntos);
  //iniciamos el usuario y la puntuacion
  usuario = nombreI.value;
  puntuacion = 0;
  //escondemos el fomulario y hacemos visibles las tablas de puntos
  score.style.visibility = "visible";
  nombre.style.visibility = "hidden";
  //mostramos la puntuacion actual que sera siempre 0
  scoreActual.innerHTML = `Usuario=${usuario}<br>${puntuacion}`;
  //y empezamos a crear bolas y mostraremos el ranking almacenado en local en caso de que lo haya
  creacionBolas();
  mostrarRanking();
  nombreI.value = "";
}
//sumar puntos se activara cada click en la bola que nos sumara 10 puntos, actualizara el score, escondera la bola y creara otra
function sumarPuntos() {
  puntuacion += 10;
  scoreActual.innerHTML = `Usuario=${usuario}<br>${puntuacion}`;
  clearInterval(intervaloCaer);
  bola.style.visibility = "hidden";
  creacionBolas();
}
//con la funcion crear bola iremos creando bolas de forma random en en lo mas alto de la pagina

function creacionBolas() {
  switch (true) {
    case puntuacion >= 250:
      nivel = 6;
      break;
    case puntuacion >= 200:
      nivel = 5;
      break;
    case puntuacion >= 150:
      nivel = 4;
      break;
    case puntuacion >= 100:
      nivel = 3;
      break;
    case puntuacion >= 50:
      nivel = 2;
      break;
  }

  //establecemos la altura
  bola.style.top = "0px";
  //lo hacemos visible
  bola.style.visibility = "visible";
  //y nos damos una posicion en el eje x aleatorio en funcion al ancho de pantalla del navegador
  bola.style.left = `${Math.random() * window.innerWidth}px`;
  //creamos el intervalo que hara caer la pelota
  intervaloCaer = setInterval(function () {
    let y = bola.offsetTop;
    y += 3 * nivel;
    //iremos sumando 5 a su posicion cada unidad de tiempo que se asignara aleatoriamente
    bola.style.top = `${y}px`;
    //si la bola llega al final de la pantalla se eliminara el intervalo, y "reiniciara el juego"
    if (bola.offsetTop >= window.innerHeight) {
      clearInterval(intervaloCaer); //borra el intervalo
      //muestra un mensaje de que la partida finalizo
      scoreActual.innerHTML = `PARTIDA FINALIZADA<br> SU PUNTUACION ES:<br>${puntuacion} puntos`;
      //vuelve a aparecer el formulario de nombre
      nombre.style.visibility = "visible";
      //guarda la puntuacion en local y actualiza el ranking
      guardarPuntos();
      mostrarRanking();
    }
  }, Math.random() * 20 + 10); //el tiempo de intervalo tambien sera random dando un +5 por si el numero es muy bajo que podamos pararlo
}
//la funcion mostrar rancking busca en local la info y la muestra en su respectivo cuadro
function mostrarRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking"));

  if (ranking != null) {
    candenaTexto =
      "<table><tr><th>Posicion</th><th>Usuario</th><th>Puntuacion</th></tr>";
    ranking.forEach(function (element, indice) {
      candenaTexto += `<tr><td>${indice + 1}</td><td>${
        element.nombre
      }</td><td>${element.puntos}</td></tr>`;
    });
    candenaTexto += "</table>";
    tablaScore.innerHTML = candenaTexto;
  }
}
//guardar puntos se realizara una vez acabada la partida para actualizar el array local
function guardarPuntos() {
  barra.style.visibility = "hidden";
  //capturamos lo que haya en memoria
  let ranking = JSON.parse(localStorage.getItem("ranking"));
  //si no existe lo creamos
  if (ranking === null) {
    ranking = [];
  }
  // creamos un objeto con las propiedades nombre y puntos pa guardarlo en el array
  let valor = {
    nombre: usuario,
    puntos: puntuacion,
  };
  nivel=1;
  //lo introducimos dentro del array
  ranking.push(valor);
  //lo ordenamos por puntos
  ranking.sort((a, b) => b.puntos - a.puntos);
  //y si hay mas de 10 registros los borramos para que solo almacene los 10 primeros
  ranking.splice(10, 1);
  //y lo metemos en local
  localStorage.setItem("ranking", JSON.stringify(ranking));
}
