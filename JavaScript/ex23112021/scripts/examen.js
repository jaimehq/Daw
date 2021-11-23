let figuras = [
  {
    id: "futbol",
    ruta: "imagenes/futbol.png",
    puntos: 20,
  },
  {
    id: "basket",
    ruta: "imagenes/basket.png",
    puntos: 10,
  },
  {
    id: "tenis",
    ruta: "imagenes/tenis.jpg",
    puntos: 5,
  },
  {
    id: "rugby",
    ruta: "imagenes/rugby.png",
    puntos: 2,
  },
];
//obtenemos el array de las imagenes que bamos a modificar
let posicion = [...document.getElementsByTagName("img")];
//capturamos el evento onclick del boton, las IDs podemos manejarlas directamente sin tener que capturarlas
btn.onclick = jugar;
//declaramos la variable player que es la que vamos a usar durante la partida
let player;
//y una variable detener que nos servirá para detener el juego cuando demos al espacio
let detener = false;
//la primera funcion jugar sera la que inicie la partida
function jugar() {
  //asignamos el valor a player del input jugador
  player = jugador.value;
  //y si este no esta vacio empezamos
  if (player != "") {
    //reiniciamos los elementos
    reiniciar();
    //creamos un event listener de mouse enter para cada imagen
    posicion.forEach((element) => {
      element.addEventListener("mouseenter", cambiar);
    });
    //creamos un evento de escucha del teclado para el espacio
    document.addEventListener("keydown", parar);
  }
}
//una vez pulsemos una tecla este evento comprobara que es la tecla espacio y detendra todo ademas de calcular los puntos
function parar(evento) {
  evento.keyCode;
  if (evento.keyCode === 32) {
    detener = true;
    calcularPuntos();
  }
}
//la funcion cambiar se activara cuando se pase el raton sobre cada cuadro
function cambiar(evento) {
  //elegimos la foto en la que estamos
  let foto = evento.target;
  //y creanis un intervalo para ella que vaya cambiando sus parametros cada 200ms
  intervalo = setInterval(
    (foto) => {
      //en el caso de que detener sea falso realizara la accion y en caso contrario la detendra
      if (detener === false) {
        let aleatorio = parseInt(Math.random() * 3);
        foto.src = figuras[aleatorio].ruta;
        foto.alt = figuras[aleatorio].id;
      } else clearInterval(intervalo);
    },
    200,
    foto
  );
}
//esta funcion tiene como objetivo calcular los puntos obtenidos
function calcularPuntos() {
  //primero ponemos la puntuacion a 0
  let puntuacion = 0;
  //y con un par de bucles comprobamos las alt con las id de los dos arrays y en el paso de coincidir se le asigna a la puntuacion
  posicion.forEach((element) => {
    figuras.forEach((figura) => {
      //debugger
      if (element.alt === figura.id) puntuacion += figura.puntos;
    });
  });
  //despues de calcularlos se muestran por pantalla y se almacenan
  puntos.innerHTML = `PUNTOS<hr>${puntuacion}`;
  almacenar(puntuacion);
  document.removeEventListener("mouseenter", cambiar);
}
//con esta funcion reiniciaremos la pagina mostrando dol valores iniciales
function reiniciar() {
  detener = false;
  jugador.value = "";
  posicion.forEach(function (element, indice) {
    element.src = "imagenes/dado.png";
    element.alt = `imagen${indice}`;
  });
}
//esta funcion solo tiene como objetivo almacenar en la memoria local la infurmacion de las puntuaciones
function almacenar(puntos) {
  let registro = JSON.parse(localStorage.getItem(player));
  if (registro === null) registro = [];
  registro.push(puntos);
  localStorage.setItem(player, JSON.stringify(registro));
}
