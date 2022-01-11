/**
 * 1º crear la clase de objeto de tragapeerras con el id, src, pts
 * La puntuación dependerá si el resultado tiene los 3 logos iguales tanto de forma horizontal como diagonal optiene x 3;
 * si tiene 2 los pts x 2;
 * Para complicarlos más importaremos el array de las imagenes;
 * Se para el aleatorio al clicar el boton
 * si se consigue 2 o 3 iguales, el fondo se ilumina
 * Se puede tirar un máximo de 5 tiaradas y la puntuacion se almacenará en el Almacenmaiento local
 */

 let Slots = [
    {
        alt: "banana",
        src: "banana.png",
        pts: 20
    },
    {
        alt: "camapana",
        src: "campana.png",
        pts: 50
    },
    {
        alt: "cherry",
        src: "cherry.png",
        pts: 10
    },
    {
        alt: "diamante",
        src: "diamante.png",
        pts: 250
    },
    {
        alt: "lemon",
        src: "lemon.png",
        pts: 70
    },
    {
        alt: "sandia",
        src: "sandia.png",
        pts: 100
    },
    {
        alt: "siete",
        src: "siete.png",
        pts: 300
    },
    {
        alt: "heart",
        src: "heart.png",
        pts: 0
    }
  

]
export {Slots}